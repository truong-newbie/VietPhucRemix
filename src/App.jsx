import React, { useState, useMemo, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StudioControls } from './components/StudioControls';
import { AvatarStage } from './components/AvatarStage';
import { CultureGuardBanner } from './components/CultureGuardBanner';
import { HarmonyGauge } from './components/HarmonyGauge';
import { CultureCardModal } from './components/CultureCardModal';
import { LookbookModal } from './components/LookbookModal';
import { PartnerModal } from './components/PartnerModal';
import { AutoDemoTour } from './components/AutoDemoTour';
import { Footer } from './components/Footer';
import { SuggestionPanel } from './components/SuggestionPanel';
import { CompareDrawer } from './components/CompareDrawer';
import { QuizModal } from './components/QuizModal';
import { FamilyStageView } from './components/FamilyStageView';
import { StageModeTabs } from './components/StageModeTabs';
import { Stage3DErrorBoundary } from './components/stage3d/Stage3DErrorBoundary';
import { Link2, Check, BookmarkPlus, Layers, Users, User } from 'lucide-react';

const ProjectRoadmapPage = lazy(() =>
  import('./components/ProjectRoadmapPage').then((m) => ({ default: m.ProjectRoadmapPage }))
);
const Stage3D = lazy(() => import('./components/stage3d/Stage3D'));

import { SCENARIOS_DATA } from './data/scenariosData';
import { GARMENTS_DATA } from './data/garmentsData';
import { ACCESSORIES_DATA } from './data/accessoriesData';
import { useOutfit } from './hooks/useOutfit';
import { useFamilyStage } from './hooks/useFamilyStage';
import { useSavedOutfits } from './hooks/useSavedOutfits';
import { useBadges } from './hooks/useBadges';
import { classifyCreativity } from './engines/creativityClassifier';

export function App() {
  const [currentView, setCurrentView] = useState('studio');
  const [stageMode, setStageMode] = useState('2d'); // '2d' | '3d' | 'tryon'
  const [regionFilter, setRegionFilter] = useState('all');
  const [isCopiedLink, setIsCopiedLink] = useState(false);

  // Modals & Drawers
  const [isCultureCardOpen, setIsCultureCardOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);

  const {
    outfit,
    setField,
    applyPartial,
    getShareUrl,
    selectedGarment,
    selectedEvent,
    selectedStyle,
    outerColor,
    innerColor,
    bottomColor,
    beltColor,
    headAccessory,
    handAccessory,
    footAccessory,
    cultureState,
    cultureResult,
    harmonyResult
  } = useOutfit();

  const {
    groupMode,
    setGroupMode,
    familyMembers,
    activeMemberIndex,
    setActiveMemberIndex,
    updateMemberOutfit,
    addFamilyMember,
    removeFamilyMember
  } = useFamilyStage(outfit);

  const { savedOutfits, saveForCompare, removeSavedOutfit, clearSavedOutfits } = useSavedOutfits();
  const { earnedBadges, earnBadge, totalEarned } = useBadges();

  const accessoriesMap = useMemo(
    () => ({
      head: Object.fromEntries(ACCESSORIES_DATA.head.map((a) => [a.id, a])),
      hand: Object.fromEntries(ACCESSORIES_DATA.hand.map((a) => [a.id, a])),
      foot: Object.fromEntries(ACCESSORIES_DATA.foot.map((a) => [a.id, a]))
    }),
    []
  );

  const creativity = useMemo(
    () => classifyCreativity(cultureState, cultureResult, accessoriesMap),
    [cultureState, cultureResult, accessoriesMap]
  );

  // Khi đang ở chế độ Family, mọi thay đổi trên StudioControls cập nhật cho thành viên đang chọn (và thành viên 0 đồng bộ với outfit chính)
  const activeOutfit = groupMode === 'family' ? familyMembers[activeMemberIndex]?.outfit || outfit : outfit;

  const handleControlChange = (field, value) => {
    if (groupMode === 'family') {
      updateMemberOutfit(activeMemberIndex, { [field]: value });
      if (activeMemberIndex === 0) {
        setField(field, value);
      }
    } else {
      setField(field, value);
    }
  };

  const handleCopyShareLink = () => {
    const url = getShareUrl();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setIsCopiedLink(true);
        setTimeout(() => setIsCopiedLink(false), 2000);
      });
    }
  };

  const handleSaveCompare = () => {
    saveForCompare({
      outfit: { ...outfit },
      harmonyScore: harmonyResult.score,
      cultureStatus: cultureResult.status
    });
    setIsCompareOpen(true);
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
      ...(fixPayload.garmentId ? { garmentId: fixPayload.garmentId } : {}),
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
    setGroupMode('single');
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
        setIsCompareOpen(false);
        setIsQuizOpen(false);
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
        badgeCount={totalEarned}
        totalBadges={GARMENTS_DATA.length}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {currentView === 'roadmap' ? (
        <main className="flex-1">
          <Suspense
            fallback={
              <div className="p-12 text-center text-sm font-semibold text-[#664422]">
                Đang tải Báo cáo &amp; Lộ trình...
              </div>
            }
          >
            <ProjectRoadmapPage onBackToStudio={() => setCurrentView('studio')} />
          </Suspense>
        </main>
      ) : (
        <>
          <HeroSection onApplyScenario={handleApplyScenario} />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: 4-Tab Studio Controls + 3 Smart Suggestions */}
              <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
                <SuggestionPanel
                  eventId={outfit.eventId}
                  eventName={selectedEvent.name}
                  gender={outfit.gender}
                  mode={outfit.mode}
                  region={regionFilter}
                  selectedStyle={selectedStyle}
                  onApplyOutfit={(picked) => applyPartial(picked)}
                />

                <StudioControls
                  regionFilter={regionFilter}
                  onRegionFilterChange={setRegionFilter}
                  selectedStyleId={outfit.styleId}
                  onSelectStyle={(val) => setField('styleId', val)}
                  selectedEventId={activeOutfit.eventId}
                  onSelectEvent={(val) => handleControlChange('eventId', val)}
                  selectedGarmentId={activeOutfit.garmentId}
                  onSelectGarment={(val) => handleControlChange('garmentId', val)}
                  selectedOuterColorId={activeOutfit.outerColorId}
                  onSelectOuterColor={(val) => handleControlChange('outerColorId', val)}
                  selectedBottomColorId={activeOutfit.bottomColorId}
                  onSelectBottomColor={(val) => handleControlChange('bottomColorId', val)}
                  selectedBeltColorId={activeOutfit.beltColorId}
                  onSelectBeltColor={(val) => handleControlChange('beltColorId', val)}
                  selectedHeadId={activeOutfit.headId}
                  onSelectHead={(val) => handleControlChange('headId', val)}
                  selectedHandId={activeOutfit.handId}
                  onSelectHand={(val) => handleControlChange('handId', val)}
                  selectedFootId={activeOutfit.footId}
                  onSelectFoot={(val) => handleControlChange('footId', val)}
                />
              </div>

              {/* Right Column: Culture Guard + Stage + Harmony */}
              <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
                <CultureGuardBanner
                  cultureResult={cultureResult}
                  cultureState={cultureState}
                  onAutoFix={handleAutoFix}
                  onOpenCultureCard={() => setIsCultureCardOpen(true)}
                />

                {/* Group Mode Switcher & Stage Mode Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-[#E0D5C1] shadow-xs">
                  <StageModeTabs activeMode={stageMode} onChange={setStageMode} />

                  {stageMode === '2d' && (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setGroupMode('single')}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                          groupMode === 'single'
                            ? 'bg-[#8B1A1A] text-white shadow-xs'
                            : 'text-[#664422] hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>1 người</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setGroupMode('family')}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                          groupMode === 'family'
                            ? 'bg-[#1D2440] text-white shadow-xs'
                            : 'text-[#664422] hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Gia đình</span>
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleSaveCompare}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#FAF7F2] hover:bg-[#EFE8DC] text-[#1D2440] border border-[#DECDB8] transition"
                    >
                      <BookmarkPlus className="w-3.5 h-3.5 text-[#8B1A1A]" />
                      <span>Lưu so sánh</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCompareOpen(true)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#FAF3DD] hover:bg-[#F3E5B8] text-[#664422] border border-[#C9A227]/60 transition"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#C9A227]" />
                      <span>So sánh ({savedOutfits.length}/3)</span>
                    </button>
                  </div>
                </div>

                {stageMode === '2d' && groupMode === 'family' ? (
                  <FamilyStageView
                    members={familyMembers}
                    activeIndex={activeMemberIndex}
                    onSelectMember={setActiveMemberIndex}
                    onAddMember={addFamilyMember}
                    onRemoveMember={removeFamilyMember}
                  />
                ) : null}

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                  {(stageMode !== '2d' || groupMode === 'single') && (
                    <div className="md:col-span-7">
                      {stageMode === '3d' ? (
                        <Stage3DErrorBoundary onFallback2D={() => setStageMode('2d')}>
                          <Suspense
                            fallback={
                              <div className="w-full aspect-[3/4] max-h-[620px] rounded-2xl bg-[#FAF7F2] border border-[#E0D5C1] flex items-center justify-center text-xs font-bold text-[#8B1A1A]">
                                Đang tải sân khấu 3D xoay 360°...
                              </div>
                            }
                          >
                            <Stage3D
                              garment={selectedGarment}
                              outerColor={outerColor}
                              innerColor={innerColor}
                              bottomColor={bottomColor}
                              beltColor={beltColor}
                              headAccessory={headAccessory}
                            />
                          </Suspense>
                        </Stage3DErrorBoundary>
                      ) : (
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
                      )}
                    </div>
                  )}

                  <div className={`${stageMode === '2d' && groupMode === 'family' ? 'md:col-span-12' : 'md:col-span-5'} flex flex-col justify-between gap-3`}>
                    <HarmonyGauge harmonyResult={harmonyResult} />

                    <div className="bg-[#FAF7F2] rounded-2xl border border-[#E0D5C1] p-4 shadow-sm space-y-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C5E3B] block">
                        Góc nhìn Chuyên gia Văn hóa
                      </span>
                      <h4 className="font-bold text-sm text-[#1D2440]">
                        {selectedGarment.cultureCard?.title || 'Tư liệu Di sản Việt Phục'}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {selectedGarment.philosophy}
                      </p>
                      <button
                        onClick={() => setIsCultureCardOpen(true)}
                        className="text-xs font-bold text-[#8B1A1A] hover:underline flex items-center gap-1"
                      >
                        Đọc tư liệu &amp; Làm Quiz nhận huy hiệu →
                      </button>
                    </div>

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

      <Footer onNavigateRoadmap={() => setCurrentView('roadmap')} />

      <CultureCardModal
        isOpen={isCultureCardOpen}
        onClose={() => setIsCultureCardOpen(false)}
        garment={selectedGarment}
        onOpenQuiz={() => {
          setIsCultureCardOpen(false);
          setIsQuizOpen(true);
        }}
      />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        garment={selectedGarment}
        earnedBadges={earnedBadges}
        onEarnBadge={earnBadge}
      />

      <CompareDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        savedOutfits={savedOutfits}
        onSelectOutfit={(picked) => applyPartial(picked)}
        onRemoveOutfit={removeSavedOutfit}
        onClearAll={clearSavedOutfits}
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
        creativityLabel={creativity.label}
        familyMembers={familyMembers}
        groupMode={groupMode}
        shareUrl={getShareUrl()}
      />

      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
        selectedGarment={selectedGarment}
      />

      <AutoDemoTour
        isActive={isTourActive}
        onClose={() => setIsTourActive(false)}
        helpers={tourHelpers}
      />
    </div>
  );
}

export default App;
