import React from 'react';
import { X, BookOpen, Scroll, Sparkles, ShieldCheck } from 'lucide-react';

export function CultureCardModal({ isOpen, onClose, garment }) {
  if (!isOpen || !garment) return null;

  const card = garment.cultureCard;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl border-2 border-[#C9A227] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#8B1A1A] via-[#7A1515] to-[#5C1010] text-white p-5 flex items-center justify-between border-b-2 border-[#C9A227]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C9A227]/20 border border-[#C9A227]/50 flex items-center justify-center text-[#F9D423]">
              <Scroll className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F9D423] block">
                Tư liệu Di sản & Cổ thư
              </span>
              <h3 className="font-bold text-lg sm:text-xl text-white">
                {card.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-gray-800 text-sm leading-relaxed">
          {/* Era & Region Tag */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EAE0D0] text-[#664422] border border-[#DECDB8]">
              Thời kỳ: {garment.era}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF3DD] text-[#8C5E3B] border border-[#E8DFC8]">
              Địa bàn: {garment.region}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              {garment.tag}
            </span>
          </div>

          {/* Section 1: Lịch sử & Nguồn gốc */}
          <div className="bg-white p-4 rounded-2xl border border-[#E6DBCE] shadow-sm">
            <h4 className="font-bold text-[#8B1A1A] text-sm flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-[#C9A227]" />
              1. Bối cảnh Lịch sử & Sắc Dụ Hoàng Gia
            </h4>
            <p className="text-gray-700">{card.history}</p>
          </div>

          {/* Section 2: Cấu tạo & Triết lý nếp áo */}
          <div className="bg-white p-4 rounded-2xl border border-[#E6DBCE] shadow-sm">
            <h4 className="font-bold text-[#8B1A1A] text-sm flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
              2. Cấu tạo nếp áo & Triết lý sống cha ông
            </h4>
            <p className="text-gray-700 mb-2">{card.structure}</p>
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E6DBCE] text-xs italic text-[#664422]">
              💡 {garment.philosophy}
            </div>
          </div>

          {/* Section 3: Việt phục Remix - Hướng dẫn phối đồ Gen Z */}
          <div className="bg-gradient-to-r from-[#FAF3DD] to-[#F4EFE6] p-4 rounded-2xl border border-[#C9A227]/40 shadow-sm">
            <h4 className="font-bold text-[#8C5E3B] text-sm flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#C9A227]" />
              3. Phong cách Gen Z & Đa Thế Hệ (Remix Guide)
            </h4>
            <p className="text-gray-700">{card.modernRemix}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#FAF3DD] p-4 border-t border-[#DECDB8] flex items-center justify-between">
          <span className="text-xs text-gray-500 italic">
            Trích xuất từ công trình nghiên cứu “Ngàn năm áo mũ” & Bảo tàng Lịch sử Quốc gia.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#8B1A1A] hover:bg-[#A62626] transition shadow"
          >
            Đã Hiểu & Tiếp Tục Phối Đồ
          </button>
        </div>
      </div>
    </div>
  );
}

