import React, { useState } from 'react';
import { MessageSquareHeart, X, Send, Sparkles, BookOpen } from 'lucide-react';

const QUICK_QUESTIONS = [
  'Áo đang mặc có nguồn gốc lịch sử thế nào?',
  'Phân biệt Áo Ngũ Thân với Sườn Xám / Hán Phục?',
  'Vì sao đi lễ chùa nên tránh màu đỏ son?',
  'Nguyên lý Ngũ Hành tương sinh khi phối màu?'
];

export function CulturalAdvisorChat({ activeOutfit, garmentName, eventName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Xin chào! Tôi là Cố vấn Văn hóa Việt Phục Remix. Tôi chỉ trả lời dựa trên kho tư liệu di sản đã thẩm định và luôn đính kèm nguồn trích dẫn.',
      citations: []
    }
  ]);

  const sendQuestion = async (qText) => {
    const text = (qText || input).trim();
    if (!text || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setLoading(true);

    try {
      const resp = await fetch('/api/rag-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, activeOutfit })
      });
      const data = await resp.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.answer || data.error || 'Chưa nhận được phản hồi.',
          citations: data.citations || []
        }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Không kết nối được tới Cố vấn AI. Vui lòng thử lại sau.',
          citations: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Mở Cố vấn AI Di sản"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#8B1A1A] to-[#1D2440] text-white font-bold text-xs shadow-2xl border-2 border-[#C9A227] hover:scale-105 transition"
        >
          <MessageSquareHeart className="w-4 h-4 text-[#F9D423]" />
          <span>Hỏi Cố vấn Di sản (RAG)</span>
        </button>
      )}

      {/* Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[92vw] max-w-md bg-[#FAF7F2] rounded-3xl border-2 border-[#C9A227] shadow-2xl overflow-hidden flex flex-col max-h-[78vh] animate-fadeIn">
          <div className="bg-gradient-to-r from-[#8B1A1A] to-[#1D2440] text-white p-3.5 flex items-center justify-between border-b border-[#C9A227]">
            <div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#F9D423]" />
                <h4 className="font-bold text-sm">Cố Vấn Văn Hóa (Structured RAG)</h4>
              </div>
              <p className="text-[10px] text-[#F9D423] truncate max-w-[260px]">
                Đang xem: {garmentName} • {eventName}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Đóng chat cố vấn"
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 overflow-y-auto flex-1 space-y-2.5 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-2xl max-w-[90%] whitespace-pre-line leading-relaxed ${
                  m.role === 'user'
                    ? 'ml-auto bg-[#8B1A1A] text-white'
                    : 'bg-white border border-[#E0D5C1] text-gray-800'
                }`}
              >
                <p>{m.text}</p>
                {m.citations && m.citations.length > 0 && (
                  <div className="mt-1.5 pt-1.5 border-t border-gray-100 flex items-center gap-1 flex-wrap text-[10px] text-[#8C5E3B]">
                    <BookOpen className="w-3 h-3 shrink-0" />
                    <span>{m.citations.slice(0, 2).join(' • ')}</span>
                  </div>
                )}
              </div>
            ))}
            {loading && <p className="text-[11px] italic text-gray-500">Đang tra cứu tư liệu di sản...</p>}
          </div>

          {/* Quick Suggested Questions */}
          <div className="px-3 py-1.5 bg-[#FAF3DD] border-t border-[#E8DFC8] flex gap-1.5 overflow-x-auto">
            {QUICK_QUESTIONS.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => sendQuestion(q)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-white border border-[#DECDB8] text-[10px] font-semibold text-[#664422] hover:border-[#8B1A1A]"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendQuestion();
            }}
            className="p-2.5 bg-white border-t border-[#DECDB8] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi về lịch sử, quy tắc mặc Việt phục..."
              className="flex-1 text-xs px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E0D5C1] focus:outline-hidden focus:border-[#8B1A1A]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Gửi câu hỏi"
              className="p-2 rounded-xl bg-[#8B1A1A] text-white disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
