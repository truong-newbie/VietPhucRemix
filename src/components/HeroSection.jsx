import React from 'react';
import { Quote, Sparkles, AlertOctagon, Heart, Music } from 'lucide-react';

export function HeroSection({ onApplyScenario }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#8B1A1A] via-[#751515] to-[#5C1010] text-white py-6 px-4 sm:px-6 lg:px-8 border-b-4 border-[#C9A227] shadow-lg">
      {/* Decorative Traditional Patterns */}
      <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center">
        <svg viewBox="0 0 200 200" className="h-48 w-48 text-[#C9A227]">
          <polygon points="100,10 120,70 190,70 135,110 155,170 100,130 45,170 65,110 10,70 80,70" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left: Core Cultural Philosophy */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/40 text-[#F9D423] text-xs font-semibold mb-2.5">
            <Quote className="w-3.5 h-3.5" />
            <span>Nghị quyết 33-NQ/TW & Nghị quyết 68-NQ/TW • Công nghiệp văn hóa sáng tạo</span>
          </div>

          <h1 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-[#FAF7F2] leading-snug">
            “Mọi người nghĩ như thế nào là một đất nước mạnh? Quân sự ư, vũ khí ư?{' '}
            <span className="text-[#F9D423] underline decoration-[#C9A227] decoration-2 underline-offset-4">
              Không, chính Văn hóa của dân tộc mới là nội lực mạnh nhất!
            </span>”
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#F0E6D8]/90 font-light">
            Ứng dụng thử nghiệm phối Việt phục tương tác thời gian thực, tích hợp Lá chắn Văn hóa (<span className="text-[#F9D423] font-medium">Culture Guard</span>) và Chấm điểm Ngũ hành (<span className="text-[#F9D423] font-medium">Harmony Score</span>).
          </p>
        </div>

        {/* Right: Quick Demo Scenario Launchpad for Judges / Pitch */}
        <div className="w-full md:w-auto bg-black/25 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#F9D423] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> 4 Kịch bản Demo nhanh cho Ban Giám Khảo:
          </span>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => onApplyScenario('genz-tet')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-left border border-white/10 text-white font-medium hover:border-[#F9D423]"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>1. Gen Z Phố Tết</span>
            </button>

            <button
              onClick={() => onApplyScenario('temple-violation')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 transition text-left border border-rose-500/30 text-rose-200 font-medium hover:border-rose-400"
            >
              <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>2. Thử Bắt Lỗi (Red)</span>
            </button>

            <button
              onClick={() => onApplyScenario('royal-wedding')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-left border border-white/10 text-white font-medium hover:border-[#F9D423]"
            >
              <Heart className="w-3.5 h-3.5 text-[#F9D423] shrink-0" />
              <span>3. Đám Cưới Hoàng Tộc</span>
            </button>

            <button
              onClick={() => onApplyScenario('quan-ho-heritage')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-left border border-white/10 text-white font-medium hover:border-[#F9D423]"
            >
              <Music className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
              <span>4. Quan Họ Kinh Bắc</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

