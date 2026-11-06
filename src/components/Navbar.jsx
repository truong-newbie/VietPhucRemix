import React from 'react';
import { Sparkles, Users, BookOpen, Download, Store, ShieldCheck, Compass, ArrowLeft } from 'lucide-react';

export function Navbar({
  currentView,
  onViewChange,
  mode,
  onModeChange,
  onOpenCultureCard,
  onOpenLookbook,
  onOpenPartners
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DBCE] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand & Motto */}
        <button
          onClick={() => onViewChange('studio')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#8B1A1A] to-[#600C0C] flex items-center justify-center shadow-md text-white border border-[#C9A227] group-hover:scale-105 transition-transform">
            <span className="font-serif font-black text-xl tracking-wider text-[#C9A227]">VR</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-lg sm:text-xl tracking-tight text-[#1D2440] group-hover:text-[#8B1A1A] transition-colors">
                VIỆT PHỤC REMIX
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF3DD] text-[#8C5E3B] border border-[#E2D2B5]">
                <ShieldCheck className="w-3 h-3 text-[#1F6F5C]" /> HaUI Mindset 2026
              </span>
            </div>
            <p className="text-[11px] text-[#7A6B5D] hidden sm:block">
              “Mặc đẹp – Mặc đúng – Giữ trọn hồn thiêng dân tộc”
            </p>
          </div>
        </button>

        {/* Center Target Audience Mode Switcher (Visible only in Studio mode) */}
        {currentView === 'studio' && (
          <div className="hidden lg:flex items-center bg-[#EFE8DC] p-1 rounded-xl border border-[#DECDB8]">
            <button
              onClick={() => onModeChange('genz')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'genz'
                  ? 'bg-[#8B1A1A] text-white shadow'
                  : 'text-[#664422] hover:text-black'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F9D423]" />
              Gen Z Bắt Trend
            </button>
            <button
              onClick={() => onModeChange('family')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'family'
                  ? 'bg-[#1D2440] text-white shadow'
                  : 'text-[#664422] hover:text-black'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-[#C9A227]" />
              Gia Đình & Quý Phái 30+
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* THE NEW PROMINENT ROADMAP LANDING PAGE BUTTON */}
          <button
            onClick={() => onViewChange(currentView === 'studio' ? 'roadmap' : 'studio')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm border ${
              currentView === 'roadmap'
                ? 'bg-[#8B1A1A] text-white border-[#8B1A1A] shadow-md'
                : 'bg-gradient-to-r from-[#FAF3DD] to-[#F4EFE6] text-[#8C5E3B] border-[#C9A227] hover:border-[#8B1A1A] hover:text-[#8B1A1A]'
            }`}
            title="Xem báo cáo những gì MVP đã làm được & Lộ trình tương lai"
          >
            {currentView === 'roadmap' ? (
              <>
                <ArrowLeft className="w-4 h-4 text-white" />
                <span>Vào Phối Đồ</span>
              </>
            ) : (
              <>
                <Compass className="w-4 h-4 text-[#C9A227] animate-spin-slow" />
                <span className="hidden sm:inline">Báo Cáo MVP &amp; Lộ Trình</span>
                <span className="sm:hidden">Lộ Trình</span>
              </>
            )}
          </button>

          {currentView === 'studio' && (
            <>
              <button
                onClick={onOpenCultureCard}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#8B1A1A] bg-[#8B1A1A]/10 hover:bg-[#8B1A1A]/20 transition border border-[#8B1A1A]/20"
                title="Đọc Thẻ văn hóa 60s"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden xl:inline">Thẻ Văn Hóa</span>
              </button>

              <button
                onClick={onOpenPartners}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#1F6F5C] bg-[#1F6F5C]/10 hover:bg-[#1F6F5C]/20 transition border border-[#1F6F5C]/20"
                title="Mạng lưới tiệm thuê đối tác"
              >
                <Store className="w-4 h-4" />
                <span className="hidden xl:inline">Tiệm Thuê</span>
              </button>

              <button
                onClick={onOpenLookbook}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#8B1A1A] to-[#A62626] hover:brightness-110 transition shadow-md"
                title="Xuất ảnh Lookbook cá nhân"
              >
                <Download className="w-4 h-4 text-[#F9D423]" />
                <span className="hidden sm:inline">Xuất Lookbook</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
