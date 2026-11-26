import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  X,
  SkipForward,
  SkipBack,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  Mic
} from 'lucide-react';
import { TOUR_STEPS } from '../data/tourStepsData';

export function AutoDemoTour({
  isActive,
  onClose,
  helpers
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [availableVoices, setAvailableVoices] = useState([]);
  const audioRef = useRef(null);
  const helpersRef = useRef(helpers);
  const isPlayingRef = useRef(isPlaying);
  const isVoiceEnabledRef = useRef(isVoiceEnabled);

  useEffect(() => {
    helpersRef.current = helpers;
  }, [helpers]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    isVoiceEnabledRef.current = isVoiceEnabled;
  }, [isVoiceEnabled]);

  const currentStep = TOUR_STEPS[currentStepIndex];

  // Load available browser synthesis voices for secondary fallback
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Stop all active audio & synthesis
  const stopAllAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Play authentic Vietnamese AI narration (HTML5 Audio MP3)
  const playStepAudio = useCallback(
    (stepIndex) => {
      stopAllAudio();
      if (!isVoiceEnabledRef.current || !isActive) return;

      const base = import.meta.env.BASE_URL.endsWith('/')
        ? import.meta.env.BASE_URL
        : `${import.meta.env.BASE_URL}/`;
      const audioUrl = `${base}audio/step${stepIndex + 1}.mp3`;

      try {
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Audio playback error, attempting speech fallback:', err);
            const text = TOUR_STEPS[stepIndex]?.voiceText;
            if (text && typeof window !== 'undefined' && 'speechSynthesis' in window) {
              const utterance = new SpeechSynthesisUtterance(text);
              utterance.lang = 'vi-VN';
              const viVoice = availableVoices.find(
                (v) => v.lang.startsWith('vi') || v.lang.includes('VN')
              );
              if (viVoice) utterance.voice = viVoice;
              window.speechSynthesis.speak(utterance);
            }
          });
        }
      } catch (e) {
        console.warn('HTML5 Audio init failed:', e);
      }
    },
    [availableVoices, isActive, stopAllAudio]
  );

  // Stop audio on unmount or when tour is closed
  useEffect(() => {
    if (!isActive) {
      stopAllAudio();
    }
    return () => {
      stopAllAudio();
    };
  }, [isActive, stopAllAudio]);

  // Handle Play / Pause audio sync
  useEffect(() => {
    if (!isActive) return;
    if (isPlaying) {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    } else {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
    }
  }, [isPlaying, isActive]);

  // Execute step action and voice whenever step changes
  useEffect(() => {
    if (!isActive) return;
    const step = TOUR_STEPS[currentStepIndex];
    if (step) {
      if (step.action) {
        step.action(helpersRef.current);
      }
      if (isPlayingRef.current && isVoiceEnabledRef.current) {
        playStepAudio(currentStepIndex);
      }
    }
  }, [isActive, currentStepIndex, playStepAudio]);

  // Timer loop for auto progression
  useEffect(() => {
    if (!isActive || !isPlaying) return;

    const interval = setInterval(() => {
      setElapsedTime((prev) => {
        const nextTime = prev + 1;
        const step = TOUR_STEPS[currentStepIndex];
        if (step && nextTime >= step.durationSec) {
          if (currentStepIndex < TOUR_STEPS.length - 1) {
            setCurrentStepIndex((curr) => curr + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return step.durationSec;
          }
        }
        return nextTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPlaying, currentStepIndex]);

  const handleNext = useCallback(() => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex((c) => c + 1);
      setElapsedTime(0);
    }
  }, [currentStepIndex]);

  const handlePrev = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((c) => c - 1);
      setElapsedTime(0);
    }
  }, [currentStepIndex]);

  const handleClose = useCallback(() => {
    stopAllAudio();
    onClose();
  }, [stopAllAudio, onClose]);

  // Phím tắt cho người thuyết trình: -> bước tiếp, <- bước trước, Esc thoát
  useEffect(() => {
    if (!isActive) return;
    const onKeyDown = (e) => {
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isActive, handleNext, handlePrev, handleClose]);

  if (!isActive) return null;

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setElapsedTime(0);
    setIsPlaying(true);
    if (isVoiceEnabled) {
      playStepAudio(0);
    }
  };

  const toggleVoice = () => {
    const nextState = !isVoiceEnabled;
    isVoiceEnabledRef.current = nextState;
    setIsVoiceEnabled(nextState);
    if (!nextState) {
      stopAllAudio();
    } else {
      playStepAudio(currentStepIndex);
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 bg-black/90 backdrop-blur-md border-t-2 border-[#C9A227] text-white shadow-2xl animate-fadeIn font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Step Indicator & Progress */}
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#8B1A1A] border border-[#C9A227] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#F9D423]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#C9A227] text-black">
                Cảnh {currentStep.id}/6 • {currentStep.timeRange}
              </span>
              <span className="text-[11px] text-gray-300 font-mono">
                {elapsedTime}s / {currentStep.durationSec}s
              </span>
            </div>
            <h4 className="font-bold text-sm text-[#F9D423] truncate mt-0.5">
              {currentStep.title}
            </h4>
          </div>
        </div>

        {/* Subtitle Teleprompter (Lời thoại hiển thị & AI đang đọc) */}
        <div className="flex-1 w-full max-w-xl bg-white/10 p-2.5 rounded-xl border border-white/15 text-xs text-gray-200 leading-relaxed">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="flex items-center gap-1.5 text-[#F9D423] font-bold text-[11px] uppercase">
              <Mic className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Lời thuyết minh {isVoiceEnabled ? '(AI đang đọc live)' : '(Đã tắt tiếng)'}:</span>
            </span>

            {/* Voice Mute / Unmute Button */}
            <button
              onClick={toggleVoice}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold transition ${
                isVoiceEnabled
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/20 text-gray-300 hover:text-white'
              }`}
              title="Bật/Tắt giọng đọc AI tự động"
            >
              {isVoiceEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
              <span>{isVoiceEnabled ? 'Giọng AI: BẬT' : 'Giọng AI: TẮT'}</span>
            </button>
          </div>
          <p className="line-clamp-2 italic text-gray-100">{currentStep.subtitle}</p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            aria-label="Cảnh trước"
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 transition text-white"
            title="Quay lại cảnh trước (←)"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Tạm dừng' : 'Tiếp tục phát'}
            className="p-2.5 rounded-xl bg-[#8B1A1A] hover:bg-[#A62626] transition text-white shadow-sm"
            title={isPlaying ? 'Tạm dừng' : 'Tiếp tục phát'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === TOUR_STEPS.length - 1}
            aria-label="Sang cảnh tiếp theo"
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 transition text-white"
            title="Sang cảnh tiếp theo (→)"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={handleRestart}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
            title="Bắt đầu lại từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleClose}
            className="p-2.5 rounded-xl bg-rose-900/60 hover:bg-rose-800 transition text-rose-200 ml-1.5"
            title="Thoát chế độ thuyết trình"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
