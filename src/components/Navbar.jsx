import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  BookOpen,
  Download,
  Store,
  Compass,
  Palette,
  Menu,
  X
} from 'lucide-react';

export function Navbar({
  currentView,
  onViewChange,
  mode,
  onModeChange,
  onOpenCultureCard,
  onOpenLookbook,
  onOpenPartners
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DBCE] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* 1. Brand Logo (Compact & Crisp) */}
        <button
          onClick={() => {
            onViewChange('studio');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 text-left shrink-0 group focus:outline-hidden"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B1A1A] to-[#600C0C] flex items-center justify-center shadow-xs text-white border border-[#C9A227] group-hover:scale-105 transition-transform">
            <span className="font-serif font-black text-base tracking-wider text-[#C9A227]">VR</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-base sm:text-lg text-[#1D2440] tracking-normal group-hover:text-[#8B1A1A] transition-colors whitespace-nowrap">
              Việt Phục Remix
            </span>
            <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-[#FAF3DD] text-[#8C5E3B] border border-[#E2D2B5]">
              HaUI 2026
            </span>
          </div>
        </button>

        {/* 2. Center Primary View Switcher (Segmented Control - Desktop & Tablet) */}
        <div className="hidden md:flex items-center bg-[#EFE8DC] p-1 rounded-xl border border-[#DECDB8] shadow-inner">
          <button
            onClick={() => onViewChange('studio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentView === 'studio'
                ? 'bg-white text-[#8B1A1A] shadow-xs font-bold'
                : 'text-[#664422] hover:text-black'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-[#8B1A1A]" />
            <span>Phòng Phối Đồ</span>
          </button>
          <button
            onClick={() => onViewChange('roadmap')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentView === 'roadmap'
                ? 'bg-[#1D2440] text-white shadow-xs font-bold'
                : 'text-[#664422] hover:text-black'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#F9D423]" />
            <span>Lộ Trình &amp; Báo Cáo</span>
          </button>
        </div>

        {/* 3. Right Action Tools (Streamlined & Clean) */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {currentView === 'studio' && (
            <>
              {/* Audience Mode Pill Toggle */}
              <div className="flex items-center bg-[#EFE8DC] p-0.5 rounded-lg border border-[#DECDB8] text-xs">
                <button
                  onClick={() => onModeChange('genz')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                    mode === 'genz'
                      ? 'bg-[#8B1A1A] text-white shadow-xs'
                      : 'text-[#664422] hover:text-black'
                  }`}
                  title="Chế độ phong cách Gen Z năng động"
                >
                  Gen Z
                </button>
                <button
                  onClick={() => onModeChange('family')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                    mode === 'family'
                      ? 'bg-[#1D2440] text-white shadow-xs'
                      : 'text-[#664422] hover:text-black'
                  }`}
                  title="Chế độ trang trọng Gia đình & Quý phái 30+"
                >
                  Gia Đình
                </button>
              </div>

              {/* Utility Icon Buttons */}
              <button
                onClick={onOpenCultureCard}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#7A6B5D] hover:text-[#8B1A1A] hover:bg-black/5 transition"
                title="Đọc thông tin nguồn gốc di sản (Thẻ văn hóa 60s)"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#8B1A1A]" />
                <span className="hidden lg:inline text-[11px]">Tư liệu</span>
              </button>

              <button
                onClick={onOpenPartners}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#7A6B5D] hover:text-[#1F6F5C] hover:bg-black/5 transition"
                title="Mạng lưới tiệm thuê & may đo đối tác"
              >
                <Store className="w-3.5 h-3.5 text-[#1F6F5C]" />
                <span className="hidden lg:inline text-[11px]">Tiệm thuê</span>
              </button>

              {/* Primary CTA Button */}
              <button
                onClick={onOpenLookbook}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#8B1A1A] to-[#A62626] hover:brightness-110 transition shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#F9D423]" />
                <span>Xuất Lookbook</span>
              </button>
            </>
          )}

          {currentView === 'roadmap' && (
            <button
              onClick={() => onViewChange('studio')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#8B1A1A] hover:bg-[#A62626] transition shadow-xs"
            >
              <Palette className="w-3.5 h-3.5 text-[#F9D423]" />
              <span>Vào Thử Đồ</span>
            </button>
          )}
        </div>

        {/* 4. Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {currentView === 'studio' && (
            <button
              onClick={onOpenLookbook}
              className="px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-[#8B1A1A] shadow-xs"
            >
              Lookbook
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-[#664422] hover:bg-[#EFE8DC] transition focus:outline-hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 5. Mobile Drawer Menu (Smooth Collapse) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#DECDB8] bg-[#FAF7F2] px-4 py-3 space-y-3 animate-fadeIn shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onViewChange('studio');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${
                currentView === 'studio'
                  ? 'bg-[#8B1A1A] text-white shadow-xs'
                  : 'bg-white text-[#664422] border border-[#DECDB8]'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Phòng Phối Đồ</span>
            </button>
            <button
              onClick={() => {
                onViewChange('roadmap');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${
                currentView === 'roadmap'
                  ? 'bg-[#1D2440] text-white shadow-xs'
                  : 'bg-white text-[#664422] border border-[#DECDB8]'
              }`}
            >
              <Compass className="w-4 h-4 text-[#F9D423]" />
              <span>Lộ Trình &amp; Báo Cáo</span>
            </button>
          </div>

          {currentView === 'studio' && (
            <div className="pt-2 border-t border-[#DECDB8] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Đối tượng:</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => onModeChange('genz')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      mode === 'genz' ? 'bg-[#8B1A1A] text-white' : 'bg-white text-[#664422] border'
                    }`}
                  >
                    Gen Z
                  </button>
                  <button
                    onClick={() => onModeChange('family')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      mode === 'family' ? 'bg-[#1D2440] text-white' : 'bg-white text-[#664422] border'
                    }`}
                  >
                    Gia Đình
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    onOpenCultureCard();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 rounded-lg bg-white border border-[#DECDB8] text-xs font-medium text-[#7A6B5D] flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#8B1A1A]" />
                  <span>Thẻ Văn Hóa</span>
                </button>
                <button
                  onClick={() => {
                    onOpenPartners();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 rounded-lg bg-white border border-[#DECDB8] text-xs font-medium text-[#7A6B5D] flex items-center justify-center gap-1.5"
                >
                  <Store className="w-3.5 h-3.5 text-[#1F6F5C]" />
                  <span>Tiệm Thuê</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
