import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StudioControls } from './components/StudioControls';
import { AvatarStage } from './components/AvatarStage';
import { CultureGuardBanner } from './components/CultureGuardBanner';
import { HarmonyGauge } from './components/HarmonyGauge';
import { CultureCardModal } from './components/CultureCardModal';
import { LookbookModal } from './components/LookbookModal';
import { PartnerModal } from './components/PartnerModal';
import { ProjectRoadmapPage } from './components/ProjectRoadmapPage';
import { AutoDemoTour } from './components/AutoDemoTour';
import { Footer } from './components/Footer';
import { Link2, Check } from 'lucide-react';

import { SCENARIOS_DATA } from './data/scenariosData';
import { useOutfit } from './hooks/useOutfit';
import { useFamilyStage } from './hooks/useFamilyStage';

export function App() {
  // Navigation View: 'studio' (Phối đồ) | 'roadmap' (Landing page báo cáo MVP & lộ trình)
  const [currentView, setCurrentView] = useState('studio');
  const [isCopiedLink, setIsCopiedLink] = useState(false);

  // Modals & Guided Tour
  const [isCultureCardOpen, setIsCultureCardOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);

  // Quản lý state bộ phối (URL + localStorage + engines)
  const {
    outfit,
    setField,
    applyPartial,
    getShareUrl,
    selectedGarment,
    selectedEvent,
    outerColor,
    innerColor,
    bottomColor,
    beltColor,
    headAccessory,
    handAccessory,
    footAccessory,
    cultureResult,
    harmonyResult
  } = useOutfit();

  // Sẵn sàng quản lý 2-4 thành viên cho Phase 3
  useFamilyStage(outfit);

  const handleCopyShareLink = () => {
    const url = getShareUrl();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setIsCopiedLink(true);
        setTimeout(() => setIsCopiedLink(false), 2000);
      });
    }
  };

  const handleModeChange = (newMode) => {
    if (newMode === 'family') {
      applyPartial({
        mode: 'family',
        eventId: 'dam-cuoi',
        garmentId: 'nhat-binh',
        outerColorId: 'do-son',
        headId: 'tram-cai-sen',
        handId: 'quat-lua',
        footId: 'guoc-moc',
        bottomLength: 'long'
      });
    } else {
      applyPartial({
        mode: 'genz',
        eventId: 'tet-xuan',
        garmentId: 'ngu-than',
        outerColorId: 'do-son',
        headId: 'khan-van',
        handId: 'tui-tote',
        footId: 'sneaker-trang',
        bottomLength: 'long'
      });
    }
  };

  const handleAutoFix = (fixPayload) => {
    applyPartial({
      ...(fixPayload.outerColorId ? { outerColorId: fixPayload.outerColorId } : {}),
      ...(fixPayload.bottomColorId ? { bottomColorId: fixPayload.bottomColorId } : {}),
      ...(fixPayload.beltColorId ? { beltColorId: fixPayload.beltColorId } : {}),
      ...(fixPayload.headAccessoryId ? { headId: fixPayload.headAccessoryId } : {}),
      ...(fixPayload.handAccessoryId ? { handId: fixPayload.handAccessoryId } : {}),
      ...(fixPayload.footAccessoryId ? { footId: fixPayload.footAccessoryId } : {}),
      ...(fixPayload.bottomLength ? { bottomLength: fixPayload.bottomLength } : {})
    });
  };

  const handleApplyScenario = (scenarioKey) => {
    const scenario = SCENARIOS_DATA[scenarioKey];
    if (scenario?.outfit) {
      applyPartial(scenario.outfit);
    }
  };

  const tourHelpers = useMemo(
    () => ({
      setView: setCurrentView,
      setGarment: (val) => setField('garmentId', val),
      setOuterColor: (val) => setField('outerColorId', val),
      setBottomColor: (val) => setField('bottomColorId', val),
      setFoot: (val) => setField('footId', val),
      applyScenario: handleApplyScenario,
      autoFix: handleAutoFix,
      openLookbook: () => setIsLookbookOpen(true),
      closeModals: () => {
        setIsLookbookOpen(false);
        setIsCultureCardOpen(false);
        setIsPartnerModalOpen(false);
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setField, applyPartial]
  );

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#2C241D] flex flex-col font-sans selection:bg-[#8B1A1A] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        mode={outfit.mode}
        onModeChange={handleModeChange}
        onOpenCultureCard={() => setIsCultureCardOpen(true)}
        onOpenLookbook={() => setIsLookbookOpen(true)}
        onOpenPartners={() => setIsPartnerModalOpen(true)}
        onStartTour={() => {
          setCurrentView('studio');
          setIsTourActive(true);
        }}
      />

      {/* Conditional Rendering: Studio vs Project Roadmap Page */}
      {currentView === 'roadmap' ? (
        <main className="flex-1">
          <ProjectRoadmapPage onBackToStudio={() => setCurrentView('studio')} />
        </main>
      ) : (
        <>
          {/* 2. Hero Ideological Banner & Pitch Scenarios */}
          <HeroSection onApplyScenario={handleApplyScenario} />

          {/* 3. Main Interactive Studio Workspace */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: 4-Tab Studio Customization Panel (5 Cols on LG) */}
              <div className="lg:col-span-5 space-y-4">
                <StudioControls
                  selectedEventId={outfit.eventId}
                  onSelectEvent={(val) => setField('eventId', val)}
                  selectedGarmentId={outfit.garmentId}
                  onSelectGarment={(val) => setField('garmentId', val)}
                  selectedOuterColorId={outfit.outerColorId}
                  onSelectOuterColor={(val) => setField('outerColorId', val)}
                  selectedBottomColorId={outfit.bottomColorId}
                  onSelectBottomColor={(val) => setField('bottomColorId', val)}
                  selectedBeltColorId={outfit.beltColorId}
                  onSelectBeltColor={(val) => setField('beltColorId', val)}
                  selectedHeadId={outfit.headId}
                  onSelectHead={(val) => setField('headId', val)}
                  selectedHandId={outfit.handId}
                  onSelectHand={(val) => setField('handId', val)}
                  selectedFootId={outfit.footId}
                  onSelectFoot={(val) => setField('footId', val)}
                />
              </div>

              {/* Right Column: Live Avatar Stage + Culture Guard + Harmony Score (7 Cols on LG) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Real-time Culture Guard Traffic Light Banner */}
                <CultureGuardBanner
                  cultureResult={cultureResult}
                  onAutoFix={handleAutoFix}
                  onOpenCultureCard={() => setIsCultureCardOpen(true)}
                />

                {/* Stage & Harmony Split Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                  {/* Layered SVG Interactive Stage (7 Cols) */}
                  <div className="md:col-span-7">
                    <AvatarStage
                      garment={selectedGarment}
                      outerColor={outerColor}
                      innerColor={innerColor}
                      bottomColor={bottomColor}
                      beltColor={beltColor}
                      headAccessory={headAccessory}
                      handAccessory={handAccessory}
                      footAccessory={footAccessory}
                      gender={outfit.gender}
                      onGenderChange={(val) => setField('gender', val)}
                    />
                  </div>

                  {/* Real-time Harmony Score & Quick Summary (5 Cols) */}
                  <div className="md:col-span-5 flex flex-col justify-between gap-3">
                    <HarmonyGauge harmonyResult={harmonyResult} />

                    {/* Culture 60s Callout Card */}
                    <div className="bg-[#FAF7F2] rounded-2xl border border-[#E0D5C1] p-4 shadow-sm space-y-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C5E3B] block">
                        Góc nhìn Chuyên gia Văn hóa
                      </span>
                      <h4 className="font-bold text-sm text-[#1D2440]">
                        Ý nghĩa 5 Khuy Áo Ngũ Thân
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Năm hạt cúc áo ngũ thân tượng trưng cho <strong>Ngũ thường</strong> (Nhân, Lễ, Nghĩa, Trí, Tín) – kim chỉ nam rèn luyện nhân cách của người Việt xưa.
                      </p>
                      <button
                        onClick={() => setIsCultureCardOpen(true)}
                        className="text-xs font-bold text-[#8B1A1A] hover:underline flex items-center gap-1"
                      >
                        Đọc tiếp tư liệu di sản →
                      </button>
                    </div>

                    {/* Quick Action Buttons: Share Link & Export Lookbook */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        onClick={handleCopyShareLink}
                        className="py-3 px-3 rounded-xl font-bold text-xs sm:text-sm text-[#1D2440] bg-[#FAF7F2] hover:bg-[#EAE0D0] border border-[#D8C7B0] transition shadow-sm flex items-center justify-center gap-1.5"
                        title="Sao chép link chia sẻ bộ phối này"
                      >
                        {isCopiedLink ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span className="text-emerald-700">Đã chép link!</span>
                          </>
                        ) : (
                          <>
                            <Link2 className="w-4 h-4 text-[#8B1A1A]" />
                            <span>Chia sẻ link</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setIsLookbookOpen(true)}
                        className="py-3 px-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#8B1A1A] via-[#A62626] to-[#C9A227] hover:brightness-105 transition shadow-md flex items-center justify-center gap-1.5"
                      >
                        <span>Xuất Lookbook</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}

      {/* 4. Footer */}
      <Footer onNavigateRoadmap={() => setCurrentView('roadmap')} />

      {/* 5. Modals */}
      <CultureCardModal
        isOpen={isCultureCardOpen}
        onClose={() => setIsCultureCardOpen(false)}
        garment={selectedGarment}
      />

      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        garment={selectedGarment}
        event={selectedEvent}
        outerColor={outerColor}
        bottomColor={bottomColor}
        headAccessory={headAccessory}
        handAccessory={handAccessory}
        footAccessory={footAccessory}
        harmonyResult={harmonyResult}
        shareUrl={getShareUrl()}
      />

      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
        selectedGarment={selectedGarment}
      />

      {/* 6. 3-Minute Guided Auto Tour Overlay & Teleprompter */}
      <AutoDemoTour
        isActive={isTourActive}
        onClose={() => setIsTourActive(false)}
        helpers={tourHelpers}
      />
    </div>
  );
}

export default App;
