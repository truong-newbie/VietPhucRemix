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

import { GARMENTS_DATA } from './data/garmentsData';
import { EVENTS_DATA } from './data/eventsData';
import { COLOR_PALETTE } from './data/colorsData';
import { ACCESSORIES_DATA } from './data/accessoriesData';
import { evaluateCultureGuard } from './engines/cultureEngine';
import { calculateHarmonyScore } from './engines/harmonyEngine';

export function App() {
  // Navigation View: 'studio' (Phối đồ) | 'roadmap' (Landing page báo cáo MVP & lộ trình)
  const [currentView, setCurrentView] = useState('studio');

  // Target Audience Mode: 'genz' | 'family'
  const [mode, setMode] = useState('genz');
  const [gender, setGender] = useState('female');

  // Core Outfit Configuration State
  const [selectedEventId, setSelectedEventId] = useState('tet-xuan');
  const [selectedGarmentId, setSelectedGarmentId] = useState('ngu-than');
  const [selectedOuterColorId, setSelectedOuterColorId] = useState('do-son');
  const [selectedBottomColorId, setSelectedBottomColorId] = useState('trang-su');
  const [selectedBeltColorId, setSelectedBeltColorId] = useState('hoang-tho');
  const [selectedHeadId, setSelectedHeadId] = useState('khan-van');
  const [selectedHandId, setSelectedHandId] = useState('tui-tote');
  const [selectedFootId, setSelectedFootId] = useState('sneaker-trang');
  const [bottomLength, setBottomLength] = useState('long'); // 'long' | 'short' (để test Culture Guard)

  // Modals
  const [isCultureCardOpen, setIsCultureCardOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  // 3-Minute Guided Auto Tour Mode
  const [isTourActive, setIsTourActive] = useState(false);

  // Colors Map lookup
  const colorsMap = useMemo(() => {
    const map = {};
    COLOR_PALETTE.forEach(c => {
      map[c.id] = c;
    });
    return map;
  }, []);

  // Selected Objects
  const selectedGarment = useMemo(
    () => GARMENTS_DATA.find(g => g.id === selectedGarmentId) || GARMENTS_DATA[0],
    [selectedGarmentId]
  );

  const selectedEvent = useMemo(
    () => EVENTS_DATA.find(e => e.id === selectedEventId) || EVENTS_DATA[0],
    [selectedEventId]
  );

  const outerColor = colorsMap[selectedOuterColorId] || COLOR_PALETTE[0];
  const bottomColor = colorsMap[selectedBottomColorId] || COLOR_PALETTE[4];
  const innerColor = colorsMap['trang-su'];
  const beltColor = colorsMap[selectedBeltColorId] || COLOR_PALETTE[1];

  const headAccessory = useMemo(
    () => ACCESSORIES_DATA.head.find(a => a.id === selectedHeadId),
    [selectedHeadId]
  );

  const handAccessory = useMemo(
    () => ACCESSORIES_DATA.hand.find(a => a.id === selectedHandId),
    [selectedHandId]
  );

  const footAccessory = useMemo(
    () => ACCESSORIES_DATA.foot.find(a => a.id === selectedFootId),
    [selectedFootId]
  );

  // Evaluate Culture Guard
  const cultureState = {
    eventId: selectedEventId,
    garmentId: selectedGarmentId,
    outerColorId: selectedOuterColorId,
    bottomColorId: selectedBottomColorId,
    beltColorId: selectedBeltColorId,
    headAccessoryId: selectedHeadId,
    handAccessoryId: selectedHandId,
    footAccessoryId: selectedFootId,
    bottomLength
  };

  const cultureResult = useMemo(
    () => evaluateCultureGuard(cultureState, colorsMap),
    [cultureState, colorsMap]
  );

  // Calculate Harmony Score
  const harmonyResult = useMemo(
    () =>
      calculateHarmonyScore({
        garment: selectedGarment,
        event: selectedEvent,
        outerColor,
        bottomColor,
        beltColor,
        headAccessory,
        footAccessory
      }),
    [selectedGarment, selectedEvent, outerColor, bottomColor, beltColor, headAccessory, footAccessory]
  );

  // Handle Mode Change (Gen Z vs Family)
  const handleModeChange = newMode => {
    setMode(newMode);
    if (newMode === 'family') {
      setSelectedEventId('dam-cuoi');
      setSelectedGarmentId('nhat-binh');
      setSelectedOuterColorId('do-son');
      setSelectedHeadId('tram-cai-sen');
      setSelectedHandId('quat-lua');
      setSelectedFootId('guoc-moc');
      setBottomLength('long');
    } else {
      setSelectedEventId('tet-xuan');
      setSelectedGarmentId('ngu-than');
      setSelectedOuterColorId('do-son');
      setSelectedHeadId('khan-van');
      setSelectedHandId('tui-tote');
      setSelectedFootId('sneaker-trang');
      setBottomLength('long');
    }
  };

  // 1-Click Auto-Fix Handler
  const handleAutoFix = fixPayload => {
    if (fixPayload.outerColorId) setSelectedOuterColorId(fixPayload.outerColorId);
    if (fixPayload.bottomColorId) setSelectedBottomColorId(fixPayload.bottomColorId);
    if (fixPayload.beltColorId) setSelectedBeltColorId(fixPayload.beltColorId);
    if (fixPayload.headAccessoryId) setSelectedHeadId(fixPayload.headAccessoryId);
    if (fixPayload.footAccessoryId) setSelectedFootId(fixPayload.footAccessoryId);
    if (fixPayload.bottomLength) setBottomLength(fixPayload.bottomLength);
  };

  // 4 Demo Scenarios for Pitch & Video
  const handleApplyScenario = scenarioKey => {
    if (scenarioKey === 'genz-tet') {
      setMode('genz');
      setSelectedEventId('tet-xuan');
      setSelectedGarmentId('ngu-than');
      setSelectedOuterColorId('do-son');
      setSelectedBottomColorId('trang-su');
      setSelectedBeltColorId('hoang-tho');
      setSelectedHeadId('khan-van');
      setSelectedHandId('tui-tote');
      setSelectedFootId('sneaker-trang');
      setBottomLength('long');
    } else if (scenarioKey === 'temple-violation') {
      // Cố tình tạo bối cảnh sai lệch để kiểm chứng Lá chắn Culture Guard (Báo Đỏ)
      setSelectedEventId('le-chua');
      setSelectedGarmentId('ao-dai');
      setSelectedOuterColorId('do-son');
      setBottomLength('short');
    } else if (scenarioKey === 'royal-wedding') {
      setMode('family');
      setSelectedEventId('dam-cuoi');
      setSelectedGarmentId('nhat-binh');
      setSelectedOuterColorId('hoang-tho');
      setSelectedBottomColorId('trang-su');
      setSelectedBeltColorId('do-son');
      setSelectedHeadId('tram-cai-sen');
      setSelectedHandId('quat-lua');
      setSelectedFootId('guoc-moc');
      setBottomLength('long');
    } else if (scenarioKey === 'quan-ho-heritage') {
      setSelectedEventId('hoi-lang');
      setSelectedGarmentId('tu-than');
      setSelectedOuterColorId('nau-non');
      setSelectedBottomColorId('den-tuyen');
      setSelectedBeltColorId('hoang-tho');
      setSelectedHeadId('non-quai-thao');
      setSelectedHandId('quat-lua');
      setSelectedFootId('guoc-moc');
      setBottomLength('long');
    }
  };

  // Helpers for 3-minute Guided Auto Tour
  const tourHelpers = {
    setView: setCurrentView,
    setGarment: setSelectedGarmentId,
    setOuterColor: setSelectedOuterColorId,
    setBottomColor: setSelectedBottomColorId,
    setFoot: setSelectedFootId,
    applyScenario: handleApplyScenario,
    autoFix: handleAutoFix,
    openLookbook: () => setIsLookbookOpen(true),
    closeModals: () => {
      setIsLookbookOpen(false);
      setIsCultureCardOpen(false);
      setIsPartnerModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#2C241D] flex flex-col font-sans selection:bg-[#8B1A1A] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        mode={mode}
        onModeChange={handleModeChange}
        onOpenCultureCard={() => setIsCultureCardOpen(true)}
        onOpenLookbook={() => setIsLookbookOpen(true)}
        onOpenPartners={() => setIsPartnerModalOpen(true)}
        onStartTour={() => setIsTourActive(true)}
      />

      {/* Conditionally Render: Studio View OR Roadmap Landing Page */}
      {currentView === 'roadmap' ? (
        <ProjectRoadmapPage onBackToStudio={() => setCurrentView('studio')} />
      ) : (
        <>
          {/* 2. Hero Philosophy & 4 Quick Scenarios */}
          <HeroSection onApplyScenario={handleApplyScenario} />

          {/* 3. Main Interactive Workspace */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (5 Cols on LG): Studio Controls */}
              <div className="lg:col-span-5 space-y-4">
                <StudioControls
                  selectedEventId={selectedEventId}
                  onSelectEvent={setSelectedEventId}
                  selectedGarmentId={selectedGarmentId}
                  onSelectGarment={setSelectedGarmentId}
                  selectedOuterColorId={selectedOuterColorId}
                  onSelectOuterColor={setSelectedOuterColorId}
                  selectedBottomColorId={selectedBottomColorId}
                  onSelectBottomColor={setSelectedBottomColorId}
                  selectedBeltColorId={selectedBeltColorId}
                  onSelectBeltColor={setSelectedBeltColorId}
                  selectedHeadId={selectedHeadId}
                  onSelectHead={setSelectedHeadId}
                  selectedHandId={selectedHandId}
                  onSelectHand={setSelectedHandId}
                  selectedFootId={selectedFootId}
                  onSelectFoot={setSelectedFootId}
                />
              </div>

              {/* Right Column (7 Cols on LG): Culture Guard + Layered SVG Avatar + Harmony Gauge */}
              <div className="lg:col-span-7 space-y-4">
                {/* Culture Guard Traffic-Light Alert Banner */}
                <CultureGuardBanner
                  cultureResult={cultureResult}
                  onAutoFix={handleAutoFix}
                  onOpenCultureCard={() => setIsCultureCardOpen(true)}
                />

                {/* Stage Grid: Avatar & Gauges */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                  {/* Visual Avatar Stage (7 Cols) */}
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
                      gender={gender}
                      onGenderChange={setGender}
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

                    {/* Quick Action Button: Export Lookbook */}
                    <button
                      onClick={() => setIsLookbookOpen(true)}
                      className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#8B1A1A] via-[#A62626] to-[#C9A227] hover:brightness-105 transition shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Xuất Lookbook &amp; Quét Mã QR</span>
                    </button>
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
