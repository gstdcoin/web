/** Accept only the requested model; Ollama may expand an untagged name to :latest. */
function canonicalModel(model: string): string {
  return model.split('/').pop()!.includes(':') ? model : `${model}:latest`;
}

function assertResponseModel(data: any, requested?: string): void {
  if (!data || data.error || data._gstd?.error || data._gstd?.tier === 'fallback') throw new Error('node_inference_failed');
  if (requested && requested !== 'auto'
    && (typeof data.model !== 'string' || canonicalModel(data.model) !== canonicalModel(requested))) {
    throw new Error('node_model_mismatch');
  }
}

export function assertNodeCompletion(data: unknown, requested?: string): void {
  assertResponseModel(data, requested);
  const content = (data as any).choices?.[0]?.message?.content;
  if (typeof content !== 'string' || !content.trim()) throw new Error('node_empty_response');
}

/** Validate complete SSE events before forwarding any text. A terminal protocol
 * error stays an error event, never a successful answer or another model. */
export function guardNodeStream(upstream: ReadableStream<Uint8Array>, requested?: string): ReadableStream<Uint8Array> {
  const reader = upstream.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = '';
  let done = false;
  let observedModel: string | undefined;
  let hasContent = false;
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        while (!done) {
          const boundary = /\r?\n\r?\n/.exec(buffer);
          if (boundary) {
            const event = buffer.slice(0, boundary.index);
            buffer = buffer.slice(boundary.index + boundary[0].length);
            const payload = event.split(/\r?\n/).filter(line => line.startsWith('data:')).map(line => line.slice(5).trimStart()).join('\n');
            if (!payload) continue;
            if (payload.trim() === '[DONE]') {
              if (!hasContent) throw new Error('node_empty_response');
              done = true;
              controller.enqueue(encoder.encode('data: [DONE]\n\n'));
              controller.close();
              await reader.cancel().catch(() => {});
              return;
            }
            const data = JSON.parse(payload);
            if (typeof data.model === 'string') observedModel = data.model;
            assertResponseModel({ ...data, model: observedModel }, requested);
            if (typeof data.choices?.[0]?.delta?.content === 'string' && data.choices[0].delta.content.trim()) hasContent = true;
            controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
            return;
          }
          const part = await reader.read();
          if (done) return;
          if (part.done) throw new Error('node_stream_incomplete');
          buffer += decoder.decode(part.value, { stream: true });
          if (buffer.length > 128 * 1024) throw new Error('node_stream_event_too_large');
        }
      } catch {
        if (done) return;
        done = true;
        controller.enqueue(encoder.encode('data: {"error":{"code":"node_response_invalid","message":"The node response failed validation. Retry the requested model."}}\n\n'));
        controller.close();
        await reader.cancel().catch(() => {});
      }
    },
    async cancel(reason) { done = true; await reader.cancel(reason); },
  });
}
