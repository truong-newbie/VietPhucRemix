import React, { useEffect, useState } from 'react';
import { Play, Pause, X, SkipForward, RotateCcw, Sparkles, Volume2 } from 'lucide-react';

export const TOUR_STEPS = [
  {
    id: 1,
    timeRange: '0:00 - 0:25',
    durationSec: 25,
    title: '1. Khởi đầu & Tư tưởng Di sản Dân tộc',
    subtitle: '“Kính chào Ban Giám khảo cuộc thi HaUI Startup Mindset 2026. Chúng tôi là nhóm tác giả dự án VIỆT PHỤC REMIX – Nền tảng phối đồ di sản thông minh đa thế hệ với triết lý: Văn hóa là nội lực mạnh nhất của dân tộc.”',
    action: (helpers) => {
      helpers.setView('studio');
      helpers.applyScenario('genz-tet');
      helpers.closeModals();
    }
  },
  {
    id: 2,
    timeRange: '0:25 - 0:55',
    durationSec: 30,
    title: '2. Động cơ Layered SVG Avatar & Màu sắc Ngũ Hành',
    subtitle: '“Để giải bài toán chi phí khởi nghiệp 0đ server, nhóm phát triển Động cơ Layered SVG Avatar chạy trực tiếp trên trình duyệt máy khách, đổi trang phục và màu sắc ngũ hành tương sinh tức thì với độ trễ 0ms.”',
    action: (helpers) => {
      helpers.setView('studio');
      helpers.setGarment('ngu-than');
      helpers.setOuterColor('do-son');
      helpers.setBottomColor('trang-su');
      helpers.setFoot('sneaker-trang');
    }
  },
  {
    id: 3,
    timeRange: '0:55 - 1:30',
    durationSec: 35,
    title: '3. Culture Guard – Lá Chắn Kiểm Định Văn Hóa',
    subtitle: '“Tính năng độc bản: Khi người dùng thử kết hợp sai lệch tại nơi tôn nghiêm (đi chùa mặc đồ hở/đỏ rực), Lá chắn Culture Guard lập tức báo Đèn Đỏ cảnh báo, giải thích ý nghĩa cổ thư và cung cấp nút Tự Động Chuẩn Hóa 1-click.”',
    action: (helpers) => {
      helpers.setView('studio');
      helpers.applyScenario('temple-violation');
      setTimeout(() => {
        helpers.autoFix({
          outerColorId: 'lam-cham',
          bottomLength: 'long',
          bottomColorId: 'trang-su'
        });
      }, 15000);
    }
  },
  {
    id: 4,
    timeRange: '1:30 - 2:05',
    durationSec: 35,
    title: '4. Harmony Score (0-100đ) & Xuất Lookbook Canvas',
    subtitle: '“Thuật toán Harmony Score chấm điểm hài hòa ngũ hành và thời tiết. Sau khi hoàn thành, hệ thống tự động render ảnh bưu thiếp Lookbook di sản 600×800 HD kèm mã QR để người dùng chia sẻ hoặc đặt lịch tiệm thuê đối tác.”',
    action: (helpers) => {
      helpers.setView('studio');
      helpers.applyScenario('royal-wedding');
      setTimeout(() => {
        helpers.openLookbook();
      }, 5000);
    }
  },
  {
    id: 5,
    timeRange: '2:05 - 2:40',
    durationSec: 35,
    title: '5. Minh Bạch Hạn Chế & Lộ Trình Phát Triển 2026–2028',
    subtitle: '“Tại trang Lộ trình, nhóm thẳng thắn nhìn nhận hạn chế của bản MVP (đồ họa 2D, chưa có Virtual Try-On) và vạch ra lộ trình gọi vốn ươm tạo rõ ràng: Tích hợp AI thử đồ từ ảnh thật, Mobile App Flutter và mở rộng 54 dân tộc.”',
    action: (helpers) => {
      helpers.closeModals();
      helpers.setView('roadmap');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  {
    id: 6,
    timeRange: '2:40 - 3:00',
    durationSec: 20,
    title: '6. Lời Kêu Gọi Đồng Hành & Kết Luận',
    subtitle: '“Nhóm kính mong nhận được sự đồng hành quý báu từ Ban Giám khảo và Trường Đại học Công nghiệp Hà Nội để sớm đưa dự án vào thực tiễn: Mặc đẹp – Mặc đúng – Giữ trọn hồn thiêng dân tộc! Xin trân trọng cảm ơn.”',
    action: (helpers) => {
      helpers.setView('roadmap');
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }
];

export function AutoDemoTour({
  isActive,
  onClose,
  helpers
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);

  const currentStep = TOUR_STEPS[currentStepIndex];

  // Execute step action on step change
  useEffect(() => {
    if (!isActive) return;
    const step = TOUR_STEPS[currentStepIndex];
    if (step && step.action) {
      step.action(helpers);
    }
  }, [isActive, currentStepIndex]);

  // Timer loop for auto progression
  useEffect(() => {
    if (!isActive || !isPlaying) return;

    const interval = setInterval(() => {
      setElapsedTime((prev) => {
        const nextTime = prev + 1;
        // Check if current step duration exceeded
        const step = TOUR_STEPS[currentStepIndex];
        if (step && nextTime >= step.durationSec) {
          if (currentStepIndex < TOUR_STEPS.length - 1) {
            setCurrentStepIndex((curr) => curr + 1);
            return 0; // reset elapsed for next step
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

  if (!isActive) return null;

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setElapsedTime(0);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setElapsedTime(0);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setElapsedTime(0);
    setIsPlaying(true);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 bg-black/85 backdrop-blur-md border-t-2 border-[#C9A227] text-white shadow-2xl animate-fadeIn">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Step Indicator & Progress */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-xl bg-[#8B1A1A] border border-[#C9A227] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#F9D423]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C9A227] text-black">
                Bước {currentStep.id}/6 • {currentStep.timeRange}
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

        {/* Subtitle Teleprompter (Lời thoại gợi ý đọc theo) */}
        <div className="flex-1 max-w-xl bg-white/10 p-2.5 rounded-xl border border-white/15 text-xs text-gray-200 leading-relaxed font-sans">
          <div className="flex items-center gap-1.5 text-[#F9D423] font-bold text-[10px] uppercase mb-1">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Lời thoại thuyết trình gợi ý (Đọc theo màn hình):</span>
          </div>
          <p className="line-clamp-2 italic">{currentStep.subtitle}</p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-xl bg-[#8B1A1A] hover:bg-[#A62626] transition text-white"
            title={isPlaying ? 'Tạm dừng' : 'Tiếp tục phát'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === TOUR_STEPS.length - 1}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 transition text-white"
            title="Sang cảnh tiếp theo"
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
            onClick={onClose}
            className="p-2.5 rounded-xl bg-rose-900/60 hover:bg-rose-800 transition text-rose-200 ml-2"
            title="Thoát chế độ thuyết trình"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
