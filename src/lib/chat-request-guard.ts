export const MAX_CHAT_REQUEST_BYTES = 32 * 1024;
export const MAX_CHAT_MESSAGES = 32;
export const MAX_CHAT_MESSAGE_CHARS = 8_000;
export const CHAT_RATE_LIMIT = 10;
export const CHAT_RATE_WINDOW_MS = 60_000;
const MAX_LOCAL_RATE_LIMIT_ENTRIES = 5_000;

export type RateLimiterBinding = {
  limit(options: { key: string }): Promise<{ success: boolean }>;
};

export type ChatRequestBody = {
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
  stream: boolean;
  max_tokens?: number;
  temperature?: number;
  model?: string;
};

const localRateLimits = new Map<string, { count: number; expiresAt: number }>();

export async function readJsonBody(
  req: Request,
): Promise<{ body?: unknown; status?: 400 | 413 }> {
  const declaredLength = Number(req.headers.get('content-length') || 0);
  if (declaredLength > MAX_CHAT_REQUEST_BYTES) return { status: 413 };
  if (!req.body) return { status: 400 };

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_CHAT_REQUEST_BYTES) {
      await reader.cancel();
      return { status: 413 };
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return { body: JSON.parse(new TextDecoder().decode(bytes)) };
  } catch {
    return { status: 400 };
  }
}

export function validateChatBody(value: unknown): ChatRequestBody | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;
  if (
    !Array.isArray(body.messages)
    || body.messages.length < 1
    || body.messages.length > MAX_CHAT_MESSAGES
  ) {
    return null;
  }

  let totalChars = 0;
  const messages: ChatRequestBody['messages'] = [];
  for (const message of body.messages) {
    if (!message || typeof message !== 'object' || Array.isArray(message)) return null;
    const { role, content } = message as Record<string, unknown>;
    if (
      (role !== 'system' && role !== 'user' && role !== 'assistant')
      || typeof content !== 'string'
      || content.length > MAX_CHAT_MESSAGE_CHARS
    ) {
      return null;
    }
    totalChars += content.length;
    if (totalChars > MAX_CHAT_REQUEST_BYTES) return null;
    messages.push({ role, content });
  }

  if (body.stream !== undefined && typeof body.stream !== 'boolean') return null;
  const maxTokens = body.max_tokens;
  if (maxTokens !== undefined && (
    typeof maxTokens !== 'number'
    || !Number.isSafeInteger(maxTokens)
    || maxTokens < 1
    || maxTokens > 2048
  )) {
    return null;
  }
  const temperature = body.temperature;
  if (temperature !== undefined && (
    typeof temperature !== 'number'
    || !Number.isFinite(temperature)
    || temperature < 0
    || temperature > 2
  )) {
    return null;
  }
  const model = body.model;
  if (model !== undefined && (typeof model !== 'string' || model.length > 100)) return null;

  return {
    messages,
    stream: body.stream === true,
    ...(maxTokens === undefined ? {} : { max_tokens: maxTokens }),
    ...(temperature === undefined ? {} : { temperature }),
    ...(model === undefined ? {} : { model }),
  };
}

export async function allowChatRequest(
  req: Request,
  limiter?: RateLimiterBinding,
): Promise<boolean> {
  const ip = req.headers.get('cf-connecting-ip')
    || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || 'unknown';
  if (limiter) {
    const result = await limiter.limit({ key: `chat:${ip}` });
    return result.success;
  }

  const now = Date.now();
  const entry = localRateLimits.get(ip);
  if (!entry || entry.expiresAt <= now) {
    if (!entry && localRateLimits.size >= MAX_LOCAL_RATE_LIMIT_ENTRIES) {
      localRateLimits.forEach((value, key) => {
        if (value.expiresAt <= now) localRateLimits.delete(key);
      });
      if (localRateLimits.size >= MAX_LOCAL_RATE_LIMIT_ENTRIES) return false;
    }
    localRateLimits.set(ip, { count: 1, expiresAt: now + CHAT_RATE_WINDOW_MS });
    return true;
  }

  entry.count += 1;
  return entry.count <= CHAT_RATE_LIMIT;
}

/** Consent to a provider is not consent to substitute an explicitly named model. */
export function allowsCloudFallback(raw: unknown, body: ChatRequestBody): boolean {
  return !!raw && typeof raw === 'object'
    && (raw as Record<string, unknown>).allow_cloud_fallback === true
    && (body.model === undefined || body.model === 'auto');
}
