import React, { useRef, useEffect, useState, useCallback } from 'react';
import { X, Download, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';

export function LookbookModal({
  isOpen,
  onClose,
  garment,
  event,
  outerColor,
  bottomColor,
  headAccessory,
  handAccessory,
  footAccessory,
  harmonyResult,
  shareUrl
}) {
  const canvasRef = useRef(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadFilename, setDownloadFilename] = useState('Lookbook-Viet-Phuc-Remix.png');

  const renderCanvas = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 600;
    const height = 800;
    canvas.width = width;
    canvas.height = height;

    // 1. Background Parchment
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#FAF7F2');
    grad.addColorStop(0.5, '#F5EFE6');
    grad.addColorStop(1, '#EFE8DC');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Heritage Outer Border
    ctx.strokeStyle = '#8B1A1A';
    ctx.lineWidth = 8;
    ctx.strokeRect(18, 18, width - 36, height - 36);

    ctx.strokeStyle = '#C9A227';
    ctx.lineWidth = 2;
    ctx.strokeRect(26, 26, width - 52, height - 52);

    // Corner Accents
    const drawCorner = (x, y) => {
      ctx.fillStyle = '#C9A227';
      ctx.fillRect(x - 8, y - 8, 16, 16);
    };
    drawCorner(26, 26);
    drawCorner(width - 26, 26);
    drawCorner(26, height - 26);
    drawCorner(width - 26, height - 26);

    // 3. Header Ribbon
    ctx.fillStyle = '#8B1A1A';
    ctx.fillRect(40, 45, width - 80, 75);
    ctx.strokeStyle = '#C9A227';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(43, 48, width - 86, 69);

    ctx.fillStyle = '#FAF7F2';
    ctx.font = 'bold 22px "Be Vietnam Pro", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('VIỆT PHỤC REMIX • LOOKBOOK', width / 2, 78);

    ctx.fillStyle = '#F9D423';
    ctx.font = 'italic 12px "Be Vietnam Pro", sans-serif';
    ctx.fillText('“Mặc đẹp – Mặc đúng – Giữ trọn hồn thiêng dân tộc”', width / 2, 102);

    // 4. Center Outfit Display Frame
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#DECDB8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(60, 140, width - 120, 360, 16);
    ctx.fill();
    ctx.stroke();

    // Garment Title in Frame
    ctx.fillStyle = '#8B1A1A';
    ctx.font = 'bold 24px "Be Vietnam Pro", sans-serif';
    ctx.fillText(garment ? garment.name.toUpperCase() : 'CỔ PHỤC VIỆT NAM', width / 2, 180);

    ctx.fillStyle = '#664422';
    ctx.font = '13px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`Bối cảnh: ${event ? event.name : 'Du xuân truyền thống'}`, width / 2, 206);

    // Harmony Score Badge Circle
    const cx = width / 2;
    const cy = 290;
    ctx.beginPath();
    ctx.arc(cx, cy, 55, 0, 2 * Math.PI);
    ctx.fillStyle = '#FAF3DD';
    ctx.fill();
    ctx.strokeStyle = '#C9A227';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#8B1A1A';
    ctx.font = 'bold 36px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`${harmonyResult ? harmonyResult.score : 85}`, cx, cy + 8);
    ctx.fillStyle = '#664422';
    ctx.font = 'bold 11px "Be Vietnam Pro", sans-serif';
    ctx.fillText('ĐIỂM HÀI HÒA', cx, cy + 26);

    // Palette Swatches
    ctx.fillStyle = '#7A6B5D';
    ctx.font = 'bold 12px "Be Vietnam Pro", sans-serif';
    ctx.fillText('HỆ MÀU NGŨ HÀNH:', width / 2, 380);

    const swatchX = width / 2 - 80;
    const colors = [
      { hex: outerColor?.hex || '#8B1A1A', label: 'Áo' },
      { hex: bottomColor?.hex || '#F5F5F0', label: 'Quần' },
      { hex: '#C9A227', label: 'Khuy' }
    ];
    colors.forEach((c, idx) => {
      const bx = swatchX + idx * 60;
      ctx.beginPath();
      ctx.arc(bx + 18, 415, 18, 0, 2 * Math.PI);
      ctx.fillStyle = c.hex;
      ctx.fill();
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#333333';
      ctx.font = '10px "Be Vietnam Pro", sans-serif';
      ctx.fillText(c.label, bx + 18, 448);
    });

    // Accessories Summary (combining head, hand, foot)
    const accList = [headAccessory?.name, handAccessory?.name, footAccessory?.name].filter(Boolean);
    const accSummary = accList.length > 0 ? accList.join(' • ') : 'Trang phục cổ truyền di sản';

    ctx.fillStyle = '#555555';
    ctx.font = 'italic 12px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`Phụ kiện: ${accSummary}`, width / 2, 480);

    // 5. Cultural Philosophy Quote Card
    ctx.fillStyle = '#FAF3DD';
    ctx.strokeStyle = '#E8DFC8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(60, 520, width - 120, 110, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#8B1A1A';
    ctx.font = 'bold 13px "Be Vietnam Pro", sans-serif';
    ctx.fillText('LỜI BÌNH VĂN HÓA & NGHỊ QUYẾT 68-NQ/TW:', width / 2, 545);

    ctx.fillStyle = '#444444';
    ctx.font = '12px "Be Vietnam Pro", sans-serif';
    ctx.fillText('“Văn hóa dân tộc là nội lực mạnh nhất.', width / 2, 570);
    ctx.fillText('Phối đồ truyền thống vừa hiện đại vừa giữ vẹn nguyên cấu trúc nếp áo cha ông.”', width / 2, 592);
    ctx.fillStyle = '#8C5E3B';
    ctx.font = 'italic 11px "Be Vietnam Pro", sans-serif';
    ctx.fillText('— Dự án dự thi HaUI Startup Mindset 2026', width / 2, 615);

    // 6. Real Heritage QR Code & Footer Info
    const qrSize = 90;
    const qrX = 55;
    const qrY = 645;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX, qrY, qrSize, qrSize);
    ctx.strokeStyle = '#DECDB8';
    ctx.lineWidth = 1;
    ctx.strokeRect(qrX, qrY, qrSize, qrSize);

    // Text beside QR
    ctx.textAlign = 'left';
    ctx.fillStyle = '#1D2440';
    ctx.font = 'bold 12px "Be Vietnam Pro", sans-serif';
    ctx.fillText('QUÉT MÃ ĐỂ MỞ LẠI BỘ PHỐI NÀY', 160, 668);

    ctx.fillStyle = '#666666';
    ctx.font = '11px "Be Vietnam Pro", sans-serif';
    ctx.fillText('Ứng dụng: Việt Phục Remix (Bản Web MVP)', 160, 690);
    ctx.fillText('Nhóm SV Trường CNTT&TT – ĐH Công nghiệp Hà Nội', 160, 708);

    ctx.fillStyle = '#8B1A1A';
    ctx.font = 'bold 11px "Be Vietnam Pro", sans-serif';
    ctx.fillText('Đại diện dự án: Đỗ Đăng Trường – HaUI', 160, 726);

    // Bottom Copyright
    ctx.textAlign = 'center';
    ctx.fillStyle = '#888888';
    ctx.font = '10px "Be Vietnam Pro", sans-serif';
    ctx.fillText('Bản quyền © 2026 VIET PHUC REMIX. All rights reserved.', width / 2, 770);

    // Render Real QR Code asynchronously onto canvas
    const targetUrl = shareUrl || (typeof window !== 'undefined' ? window.location.href : 'https://vietphucremix.vercel.app');

    try {
      const qrDataUrl = await QRCode.toDataURL(targetUrl, {
        width: qrSize - 8,
        margin: 1,
        color: {
          dark: '#1D2440',
          light: '#FFFFFF'
        }
      });

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, qrX + 4, qrY + 4, qrSize - 8, qrSize - 8);
        setDownloadUrl(canvas.toDataURL('image/png'));
        setDownloadFilename(`Lookbook-Viet-Phuc-Remix-${Date.now()}.png`);
      };
      img.src = qrDataUrl;
    } catch (err) {
      console.warn('QR code generation error:', err);
      // Fallback: update download url even if QR drawing has issue
      setDownloadUrl(canvas.toDataURL('image/png'));
      setDownloadFilename(`Lookbook-Viet-Phuc-Remix-${Date.now()}.png`);
    }
  }, [
    garment,
    event,
    outerColor,
    bottomColor,
    headAccessory,
    handAccessory,
    footAccessory,
    harmonyResult,
    shareUrl
  ]);

  useEffect(() => {
    if (isOpen) {
      // Fire festive celebratory confetti
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B1A1A', '#C9A227', '#1F6F5C', '#1D2440', '#F9D423']
      });

      // Render Lookbook Canvas with small debounce for font readiness
      const timer = setTimeout(() => {
        renderCanvas();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, renderCanvas]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border-2 border-[#C9A227] shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#8B1A1A] to-[#600C0C] text-white p-4 flex items-center justify-between border-b-2 border-[#C9A227]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F9D423]" />
            <h3 className="font-bold text-base sm:text-lg">
              Lookbook Di Sản Cá Nhân Hóa
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas Preview Area */}
        <div className="p-4 overflow-y-auto flex flex-col items-center">
          <div className="w-full max-w-[360px] rounded-2xl overflow-hidden shadow-xl border-2 border-[#DECDB8]">
            <canvas ref={canvasRef} className="w-full h-auto block" />
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-[#FAF3DD] p-4 border-t border-[#DECDB8] flex items-center justify-between gap-3">
          <div className="text-xs text-[#664422]">
            <span className="font-bold block">Độ phân giải: 600 × 800 HD</span>
            <span>Mã QR thật kết nối trực tiếp đến bộ phối này.</span>
          </div>

          <div className="flex items-center gap-2">
            {downloadUrl && (
              <a
                href={downloadUrl}
                download={downloadFilename}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#8B1A1A] hover:bg-[#A62626] transition shadow-md"
              >
                <Download className="w-4 h-4 text-[#F9D423]" />
                <span>Tải Ảnh Về</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
