import React, { useState, useRef } from 'react';
import { MoveHorizontal } from 'lucide-react';

/**
 * Thanh kéo so sánh Trước / Sau trực quan (hỗ trợ chuột, cảm ứng & bàn phím)
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Ảnh gốc',
  afterLabel = 'Việt Phục'
}) {
  const [percent, setPercent] = useState(55);
  const containerRef = useRef(null);

  const updateFromClientX = (clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.min(95, Math.max(5, Math.round(next))));
  };

  const handlePointerMove = (e) => {
    if (e.buttons !== 1 && e.pointerType === 'mouse') return;
    updateFromClientX(e.clientX);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') setPercent((p) => Math.max(5, p - 5));
    if (e.key === 'ArrowRight') setPercent((p) => Math.min(95, p + 5));
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture?.(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={handlePointerMove}
      className="relative w-full max-h-[360px] overflow-hidden rounded-xl border-2 border-[#C9A227] bg-white select-none touch-none cursor-ew-resize"
    >
      {/* Ảnh sau (Việt Phục) làm nền */}
      <img
        src={afterSrc}
        alt={afterLabel}
        draggable={false}
        className="w-full max-h-[360px] object-contain mx-auto block"
      />

      {/* Ảnh trước (Ảnh gốc) cắt theo % chiều ngang */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt={beforeLabel}
          draggable={false}
          className="w-full h-full max-h-[360px] object-contain mx-auto block"
        />
      </div>

      {/* Nhãn 2 góc */}
      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[11px] font-bold bg-black/65 text-white pointer-events-none">
        {beforeLabel}
      </span>
      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#8B1A1A]/90 text-[#F9D423] pointer-events-none">
        {afterLabel}
      </span>

      {/* Thanh chia & tay nắm */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Kéo để so sánh ảnh trước và sau"
        aria-valuemin={5}
        aria-valuemax={95}
        aria-valuenow={percent}
        onKeyDown={handleKeyDown}
        style={{ left: `${percent}%` }}
        className="absolute top-0 bottom-0 -translate-x-1/2 w-0.5 bg-[#F9D423] shadow focus-visible:outline-2 focus-visible:outline-[#8B1A1A]"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#8B1A1A] border-2 border-[#F9D423] text-white flex items-center justify-center shadow-lg">
          <MoveHorizontal className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
