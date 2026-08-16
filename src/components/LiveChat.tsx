'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Talks to /api/chat, which proxies straight to a live node from the
// network's own seed-peer list -- never touches app.gstdtoken.com. This is
// the live proof that the node network, not the Vercel-hosted platform, is
// what actually serves requests.
export function LiveChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [servedBy, setServedBy] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'qwen2.5:0.5b', messages: next }),
      });
      const data = await resp.json();

      if (!resp.ok) {
        setMessages([...next, { role: 'assistant', content: `⚠️ ${data.message || 'The node network is unreachable right now.'}` }]);
        setServedBy(null);
        return;
      }

      const content = data.choices?.[0]?.message?.content || '(empty response)';
      setMessages([...next, { role: 'assistant', content }]);
      setServedBy(data._servedBy || null);
    } catch {
      setMessages([...next, { role: 'assistant', content: '⚠️ Could not reach the node network. Try again shortly.' }]);
      setServedBy(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gradient-gold">Talk to the network</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            This chat is served directly by a node on the network — not by a central server.
            {servedBy && <span className="block mt-1 text-emerald-400 font-mono text-xs">served by {servedBy}</span>}
          </p>
        </motion.div>

        <div className="glass-institutional rounded-2xl border border-[#D4AF37]/20 flex flex-col h-[420px]">
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.length === 0 && (
              <p className="text-slate-500 text-sm text-center mt-16">Ask anything — your message goes straight to a live node.</p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-[#D4AF37]/15 text-slate-100 border border-[#D4AF37]/25'
                      : 'bg-white/5 text-slate-200 border border-white/10'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-xl px-4 py-2.5 text-sm bg-white/5 border border-white/10 text-slate-400">
                  thinking…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-white/10 p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
              placeholder="Message the network…"
              disabled={loading}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]/40"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="px-5 py-2.5 rounded-lg bg-[#D4AF37] text-black text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#D4AF37]/90 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
