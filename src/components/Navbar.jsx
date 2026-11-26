import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  Store,
  Compass,
  Palette,
  Menu,
  X,
  Play,
  Award,
  LogIn,
  LogOut,
  Crown,
  ChevronDown
} from 'lucide-react';

export function Navbar({
  currentView,
  onViewChange,
  mode,
  onModeChange,
  onOpenCultureCard,
  onOpenLookbook,
  onOpenPartners,
  onStartTour,
  badgeCount = 0,
  totalBadges = 7,
  onOpenQuiz,
  auth,
  entitlements,
  onOpenPricing
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface-subtle/95 backdrop-blur-md border-b border-border-subtle shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 h-16 flex items-center justify-between gap-2 lg:gap-3">
        {/* 1. Brand Logo (Compact & Crisp) */}
        <button
          onClick={() => {
            onViewChange('studio');
            setMobileMenuOpen(false);
            setMoreMenuOpen(false);
          }}
          className="flex items-center gap-2 text-left shrink-0 group focus:outline-hidden"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B1A1A] to-[#600C0C] flex items-center justify-center shadow-xs text-white border border-[#C9A227] group-hover:scale-105 transition-transform">
            <span className="font-black text-base tracking-wider text-[#C9A227]">VR</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base lg:text-lg text-[#1D2440] tracking-normal group-hover:text-[#8B1A1A] transition-colors whitespace-nowrap">
              Việt Phục Remix
            </span>
            <span className="hidden 2xl:inline-flex px-1.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#FAF3DD] text-[#8C5E3B] border border-border-subtle">
              HaUI 2026
            </span>
          </div>
        </button>

        {/* 2. Center Primary View Switcher (Segmented Control - Desktop & Tablet) */}
        <div className="hidden md:flex items-center bg-surface-muted p-1 rounded-xl border border-border-warm shadow-inner shrink-0">
          <button
            onClick={() => onViewChange('studio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              currentView === 'studio'
                ? 'bg-white text-[#8B1A1A] shadow-xs font-bold'
                : 'text-[#664422] hover:text-black'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-[#8B1A1A] shrink-0" />
            <span>Phòng Phối Đồ</span>
          </button>
          <button
            onClick={() => onViewChange('roadmap')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              currentView === 'roadmap'
                ? 'bg-[#1D2440] text-white shadow-xs font-bold'
                : 'text-[#664422] hover:text-black'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#F9D423] shrink-0" />
            <span>Lộ Trình &amp; Báo Cáo</span>
          </button>
        </div>

        {/* 3. Right Action Tools (Streamlined & Clean) */}
        <div className="hidden md:flex items-center gap-1.5 lg:gap-2 shrink-0">
          {currentView === 'studio' && (
            <>
              {/* Audience Mode Pill Toggle */}
              <div className="flex items-center bg-surface-muted p-0.5 rounded-lg border border-border-warm text-xs shrink-0">
                <button
                  onClick={() => onModeChange('genz')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition-all ${
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
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition-all ${
                    mode === 'family'
                      ? 'bg-[#1D2440] text-white shadow-xs'
                      : 'text-[#664422] hover:text-black'
                  }`}
                  title="Chế độ trang trọng Gia đình & Quý phái 30+"
                >
                  Gia Đình
                </button>
              </div>

              {/* Dropdown gom các tiện ích phụ để thanh trên luôn thoáng, không bao giờ khuất chữ */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setMoreMenuOpen((v) => !v)}
                  aria-expanded={moreMenuOpen}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#574C43] bg-white border border-border-warm hover:border-[#8B1A1A] hover:text-[#8B1A1A] whitespace-nowrap transition"
                >
                  <span>Khám phá</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {moreMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setMoreMenuOpen(false)}
                      aria-hidden="true"
                    />
                    <div className="absolute right-0 mt-2 w-60 z-50 bg-white rounded-2xl border border-border-warm shadow-xl p-1.5 space-y-1 text-xs animate-fadeIn">
                      <button
                        type="button"
                        onClick={() => {
                          setMoreMenuOpen(false);
                          onOpenCultureCard();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-[#2C241D] hover:bg-surface-subtle font-semibold"
                      >
                        <BookOpen className="w-4 h-4 text-[#8B1A1A] shrink-0" />
                        <span>Tư liệu Di sản (60s)</span>
                      </button>

                      {onOpenQuiz && (
                        <button
                          type="button"
                          onClick={() => {
                            setMoreMenuOpen(false);
                            onOpenQuiz();
                          }}
                          className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-left text-[#2C241D] hover:bg-surface-subtle font-semibold"
                        >
                          <span className="flex items-center gap-2.5">
                            <Award className="w-4 h-4 text-[#C9A227] shrink-0" />
                            <span>Quiz &amp; Thử thách</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FAF3DD] text-[#8C5E3B]">
                            {badgeCount}/{totalBadges}
                          </span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setMoreMenuOpen(false);
                          onOpenPartners();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-[#2C241D] hover:bg-surface-subtle font-semibold"
                      >
                        <Store className="w-4 h-4 text-[#1F6F5C] shrink-0" />
                        <span>Tiệm Thuê &amp; May Đo</span>
                      </button>

                      {auth?.enabled && (
                        <button
                          type="button"
                          onClick={() => {
                            setMoreMenuOpen(false);
                            if (auth.user) auth.signOut();
                            else auth.signInWithGoogle();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-[#2C241D] hover:bg-surface-subtle font-semibold border-t border-gray-100 mt-1 pt-2"
                        >
                          {auth.user ? (
                            <>
                              <LogOut className="w-4 h-4 text-emerald-700 shrink-0" />
                              <span className="truncate">Đã đồng bộ ({auth.user.email})</span>
                            </>
                          ) : (
                            <>
                              <LogIn className="w-4 h-4 text-[#8B1A1A] shrink-0" />
                              <span>Đồng bộ Google</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>

              {onOpenPricing && (
                <button
                  type="button"
                  onClick={onOpenPricing}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap shrink-0 border transition ${
                    entitlements?.isPro
                      ? 'bg-[#1D2440] text-[#F9D423] border-[#C9A227]'
                      : 'bg-white text-[#8B1A1A] border-[#C9A227] hover:bg-[#FAF3DD]'
                  }`}
                  title="Nâng cấp gói Pro & xem số dư lượt AI Thử Ảnh"
                >
                  <Crown className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                  <span>{entitlements?.isPro ? `PRO • ${entitlements.credits}` : `${entitlements?.credits ?? 2} AI`}</span>
                </button>
              )}

              {/* Auto Demo 3-Minute Tour Button */}
              <button
                onClick={onStartTour}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#C9A227] to-[#8C5E3B] hover:brightness-110 whitespace-nowrap shrink-0 transition shadow-xs"
                title="Bật chế độ tự động diễn hoạt và thuyết trình 3 phút"
              >
                <Play className="w-3.5 h-3.5 fill-white shrink-0" />
                <span>Demo 3p</span>
              </button>

              {/* Primary CTA Button */}
              <button
                onClick={onOpenLookbook}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#8B1A1A] to-[#A62626] hover:brightness-110 whitespace-nowrap shrink-0 transition shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#F9D423] shrink-0" />
                <span>Xuất Lookbook</span>
              </button>
            </>
          )}

          {currentView === 'roadmap' && (
            <button
              onClick={() => onViewChange('studio')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#8B1A1A] hover:bg-[#A62626] whitespace-nowrap shrink-0 transition shadow-xs"
            >
              <Palette className="w-3.5 h-3.5 text-[#F9D423] shrink-0" />
              <span>Vào Thử Đồ</span>
            </button>
          )}
        </div>

        {/* 4. Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {currentView === 'studio' && (
            <button
              onClick={onOpenLookbook}
              className="min-h-[40px] px-3 py-2 rounded-xl text-xs font-bold text-white bg-[#8B1A1A] shadow-xs whitespace-nowrap"
            >
              Lookbook
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-[#664422] hover:bg-surface-muted transition focus:outline-hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 5. Mobile Drawer Menu (Smooth Collapse) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border-warm bg-surface-subtle px-4 py-3 space-y-3 animate-fadeIn shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onViewChange('studio');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${
                currentView === 'studio'
                  ? 'bg-[#8B1A1A] text-white shadow-xs'
                  : 'bg-white text-[#664422] border border-border-warm'
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
                  : 'bg-white text-[#664422] border border-border-warm'
              }`}
            >
              <Compass className="w-4 h-4 text-[#F9D423]" />
              <span>Lộ Trình &amp; Báo Cáo</span>
            </button>
          </div>

          {currentView === 'studio' && (
            <div className="pt-2 border-t border-border-warm space-y-2">
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
                  className="p-2 rounded-lg bg-white border border-border-warm text-xs font-medium text-[#7A6B5D] flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#8B1A1A]" />
                  <span>Thẻ Văn Hóa</span>
                </button>
                <button
                  onClick={() => {
                    onOpenPartners();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 rounded-lg bg-white border border-border-warm text-xs font-medium text-[#7A6B5D] flex items-center justify-center gap-1.5"
                >
                  <Store className="w-3.5 h-3.5 text-[#1F6F5C]" />
                  <span>Tiệm Thuê</span>
                </button>
              </div>

              <button
                onClick={() => {
                  onStartTour();
                  setMobileMenuOpen(false);
                }}
                className="w-full p-2.5 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#8C5E3B] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs mt-2"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Bắt Đầu Tự Động Demo (3 Phút)</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
