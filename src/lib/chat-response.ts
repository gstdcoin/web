export type ChatFailure = 'unavailable' | 'rate_limit' | 'too_long' | 'invalid_response' | 'incomplete' | 'timeout';
export class ChatResponseError extends Error {
  constructor(public readonly code: ChatFailure) { super(code); }
}

const MAX_BYTES = 512 * 1024;
const MAX_EVENT_CHARS = 128 * 1024;
const MAX_ANSWER_CHARS = 64 * 1024;

/** Consume either API contract. A truncated stream is never a completed answer.
 * Both an idle deadline and the caller's total deadline cancel the underlying read. */
export async function readChatResponse(
  response: Response,
  onText: (text: string) => void,
  signal: AbortSignal,
  idleMs = 30_000,
): Promise<string> {
  if (!response.ok) {
    void response.body?.cancel().catch(() => {});
    throw new ChatResponseError(response.status === 429 ? 'rate_limit'
      : [400, 413].includes(response.status) ? 'too_long' : 'unavailable');
  }
  const reader = response.body?.getReader();
  if (!reader) throw new ChatResponseError('invalid_response');
  const decoder = new TextDecoder();
  const streaming = response.headers.get('content-type')?.includes('text/event-stream');
  let buffer = '', content = '', bytes = 0, complete = false;
  const add = (delta: unknown) => {
    if (typeof delta !== 'string') return;
    content += delta;
    if (content.length > MAX_ANSWER_CHARS) throw new ChatResponseError('invalid_response');
    onText(content);
  };
  const check = (data: any) => {
    if (!data || typeof data !== 'object' || data.error || data._gstd?.error || data._gstd?.tier === 'fallback') {
      throw new ChatResponseError('invalid_response');
    }
  };
  const read = () => new Promise<ReadableStreamReadResult<Uint8Array>>((resolve, reject) => {
    const aborted = () => { cleanup(); reject(signal.reason || new DOMException('Aborted', 'AbortError')); };
    const timer = setTimeout(() => { cleanup(); reject(new ChatResponseError('timeout')); }, idleMs);
    const cleanup = () => { clearTimeout(timer); signal.removeEventListener('abort', aborted); };
    if (signal.aborted) { aborted(); return; }
    signal.addEventListener('abort', aborted, { once: true });
    reader.read().then(value => { cleanup(); resolve(value); }, error => { cleanup(); reject(error); });
  });
  try {
    while (!complete) {
      const part = await read();
      if (part.done) {
        buffer += decoder.decode();
        if (streaming) throw new ChatResponseError('incomplete');
        let data;
        try { data = JSON.parse(buffer); } catch { throw new ChatResponseError('invalid_response'); }
        check(data);
        add(data.choices?.[0]?.message?.content);
        complete = true;
        break;
      }
      bytes += part.value.byteLength;
      if (bytes > MAX_BYTES) throw new ChatResponseError('invalid_response');
      buffer += decoder.decode(part.value, { stream: true });
      if (!streaming) continue;
      let boundary;
      while ((boundary = /\r?\n\r?\n/.exec(buffer))) {
        const event = buffer.slice(0, boundary.index);
        buffer = buffer.slice(boundary.index + boundary[0].length);
        if (event.length > MAX_EVENT_CHARS) throw new ChatResponseError('invalid_response');
        const payload = event.split(/\r?\n/).filter(line => line.startsWith('data:'))
          .map(line => line.slice(5).trimStart()).join('\n');
        if (!payload) continue;
        if (payload.trim() === '[DONE]') { complete = true; break; }
        let data;
        try { data = JSON.parse(payload); } catch { throw new ChatResponseError('invalid_response'); }
        check(data);
        add(data.choices?.[0]?.delta?.content ?? data.response);
      }
      if (buffer.length > MAX_EVENT_CHARS) throw new ChatResponseError('invalid_response');
    }
    if (!content.trim()) throw new ChatResponseError('invalid_response');
    return content;
  } finally {
    // Do not let a broken upstream's cancellation hang the UI's deadline.
    void reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}
