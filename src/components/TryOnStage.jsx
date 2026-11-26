import React, { useState, useEffect } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  Download,
  KeyRound,
  AlertCircle,
  Loader2,
  Wand2,
  Columns2,
  Cpu,
  CheckCircle2,
  Info
} from 'lucide-react';
import { compressImageFile } from '../utils/imageCompressor';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { GARMENTS_DATA } from '../data/garmentsData';
import { COLOR_PALETTE } from '../data/colorsData';

const garmentsById = Object.fromEntries(GARMENTS_DATA.map((g) => [g.id, g]));
const colorsById = Object.fromEntries(COLOR_PALETTE.map((c) => [c.id, c]));
const COLAB_URL_STORAGE_KEY = 'vpr_colab_tryon_url';

function isValidColabLink(url) {
  return /^https:\/\/[a-z0-9-]+\.trycloudflare\.com\/?$/i.test((url || '').trim());
}

async function fetchImageAsDataUrl(url) {
  const resp = await fetch(url);
  if (!resp.ok) return null;
  const blob = await resp.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : null);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(blob);
  });
}

export function TryOnStage({
  garment,
  outerColor,
  bottomColor,
  headAccessory,
  footAccessory,
  onTryOnSuccess,
  onApplyStylistOutfit,
  credits = 2,
  onConsumeCredit,
  onOpenPricing
}) {
  const [personPreview, setPersonPreview] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [stylistAdvice, setStylistAdvice] = useState(null);
  const [compareView, setCompareView] = useState('slider'); // 'slider' | 'split'
  const [loading, setLoading] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [gpuNotice, setGpuNotice] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [judgePasscode, setJudgePasscode] = useState('');
  const [colabUrl, setColabUrl] = useState(() => {
    try {
      return sessionStorage.getItem(COLAB_URL_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });
  const [showDemoConfig, setShowDemoConfig] = useState(false);

  useEffect(() => {
    try {
      if (colabUrl.trim()) {
        sessionStorage.setItem(COLAB_URL_STORAGE_KEY, colabUrl.trim());
      } else {
        sessionStorage.removeItem(COLAB_URL_STORAGE_KEY);
      }
    } catch {
      // Bỏ qua nếu sessionStorage bị chặn
    }
  }, [colabUrl]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg('');
    setGpuNotice('');
    setResultImage(null);
    setStylistAdvice(null);
    try {
      const compressed = await compressImageFile(file, 1024, 0.85);
      setPersonPreview(compressed);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleRunTryOn = async () => {
    if (!personPreview) return;
    const hasPasscode = Boolean(judgePasscode.trim());
    if (colabConnected && credits <= 0 && !hasPasscode) {
      setErrorMsg('Bạn đã dùng hết lượt AI Thử Ảnh miễn phí. Hãy nạp thêm Credit hoặc nhập Mã Giám khảo.');
      if (onOpenPricing) onOpenPricing();
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setGpuNotice('');
    setProgressText('Đang gọi AI Stylist phân tích tông da & kết nối engine thử đồ...');

    const progressTimer = setTimeout(() => {
      setProgressText('Đang xử lý ảnh Việt phục trên server GPU (khoảng 10–25 giây)...');
    }, 4000);

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (judgePasscode.trim()) {
        headers['x-judge-passcode'] = judgePasscode.trim();
      }
      if (colabUrl.trim()) {
        headers['x-colab-url'] = colabUrl.trim();
      }

      // Tự động đính kèm ảnh mẫu Việt phục chuẩn (public/garment-refs/<garmentId>.jpg) cho CatVTON
      const base = import.meta.env.BASE_URL.endsWith('/')
        ? import.meta.env.BASE_URL
        : `${import.meta.env.BASE_URL}/`;
      const refPath = garment?.id ? `${base}garment-refs/${garment.id}.jpg` : null;
      const garmentImageDataUrl = refPath ? await fetchImageAsDataUrl(refPath).catch(() => null) : null;

      const resp = await fetch('/api/try-on', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          personImageDataUrl: personPreview,
          garmentImageDataUrl,
          outfitSpec: {
            garmentId: garment?.id,
            garmentName: garment?.name,
            outerColorName: outerColor?.name,
            bottomColorName: bottomColor?.name,
            headAccessoryName: headAccessory?.name,
            footAccessoryName: footAccessory?.name
          }
        })
      });

      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.error || 'Không thể xử lý yêu cầu thử đồ AI.');
      }

      if (data.stylistAdvice) {
        setStylistAdvice(data.stylistAdvice);
      }

      if (data.gpuOffline) {
        setGpuNotice(data.message);
        return;
      }

      if (data.imageUrl) {
        setResultImage(data.imageUrl);
        if (onConsumeCredit) onConsumeCredit({ bypass: Boolean(judgePasscode.trim()) });
        if (onTryOnSuccess) onTryOnSuccess(data.imageUrl);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      clearTimeout(progressTimer);
      setLoading(false);
      setProgressText('');
    }
  };

  const colabConnected = isValidColabLink(colabUrl);
  const suggestedGarment = stylistAdvice ? garmentsById[stylistAdvice.suggestedGarmentId] : null;
  const suggestedOuter = stylistAdvice ? colorsById[stylistAdvice.suggestedOuterColorId] : null;
  const suggestedBottom = stylistAdvice ? colorsById[stylistAdvice.suggestedBottomColorId] : null;

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-[#FAF7F2] to-[#EFE8DC] border border-border-subtle shadow-xl p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-[#8B1A1A]" />
          <h4 className="font-bold text-sm text-[#1D2440]">
            AI Stylist &amp; Thử Đồ Ảnh Thật
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${
              colabConnected
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-white text-[#574C43] border-border-warm'
            }`}
          >
            <Cpu className="w-3 h-3" />
            <span>{colabConnected ? 'GPU Colab sẵn sàng' : 'AI Stylist 24/7'}</span>
          </span>

          <button
            type="button"
            onClick={() => setShowDemoConfig((v) => !v)}
            className="flex items-center gap-1 text-[11px] font-bold text-[#664422] hover:text-[#8B1A1A]"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Cài đặt Demo</span>
          </button>
        </div>
      </div>

      {/* Hộp cấu hình nhanh lúc Demo / Giám khảo (dán Link GPU Colab không cần redeploy) */}
      {showDemoConfig && (
        <div className="bg-white p-3 rounded-xl border border-border-warm space-y-2.5 text-xs">
          <div>
            <label htmlFor="tryon-colab-url" className="font-bold text-[#1D2440] block mb-1">
              Link GPU Google Colab 0đ (từ notebook <code>colab/vietphuc-tryon-server.ipynb</code>):
            </label>
            <input
              id="tryon-colab-url"
              name="colabUrl"
              type="url"
              value={colabUrl}
              onChange={(e) => setColabUrl(e.target.value)}
              placeholder="https://xxxx-xxxx.trycloudflare.com"
              className="w-full px-3 py-2 rounded-lg border border-border-warm bg-surface-subtle text-xs focus:outline-hidden focus:border-[#8B1A1A]"
            />
            {colabUrl.trim() && !colabConnected && (
              <p className="text-[11px] text-rose-700 mt-1">
                Chỉ chấp nhận link bảo mật dạng <code>https://xxxx.trycloudflare.com</code>.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="tryon-judge-passcode" className="font-bold text-[#1D2440] block mb-1">
              Mã Giám khảo (mở khóa không giới hạn lượt):
            </label>
            <input
              id="tryon-judge-passcode"
              name="judgePasscode"
              type="password"
              value={judgePasscode}
              onChange={(e) => setJudgePasscode(e.target.value)}
              placeholder="Nhập mã Giám khảo (nếu có)..."
              className="w-full px-3 py-2 rounded-lg border border-border-warm bg-surface-subtle text-xs focus:outline-hidden focus:border-[#8B1A1A]"
            />
          </div>
        </div>
      )}

      {/* Upload Dropzone */}
      <label className="block border-2 border-dashed border-[#C9A227] rounded-2xl p-4 text-center bg-white/80 hover:bg-white cursor-pointer transition">
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        <Upload className="w-6 h-6 text-[#8B1A1A] mx-auto mb-1.5" />
        <p className="text-xs font-bold text-[#1D2440]">
          {personPreview ? 'Đổi ảnh chân dung khác' : 'Tải ảnh bán thân (từ eo trở lên) hoặc toàn thân'}
        </p>
        <p className="text-[11px] text-[#574C43] mt-0.5">
          Khuyên dùng ảnh chính diện, đủ sáng; tránh ảnh thẻ chụp quá sát mặt để ghép áo tự nhiên nhất
        </p>
      </label>

      {/* Preview Ảnh Gốc hoặc Trước/Sau từ AI GPU */}
      {personPreview && (
        <div className="space-y-2">
          {resultImage && (
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Kết quả AI GPU • {garment?.name}</span>
              </span>
              <button
                type="button"
                onClick={() => setCompareView((v) => (v === 'slider' ? 'split' : 'slider'))}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-border-warm font-bold text-[#1D2440] hover:border-[#8B1A1A]"
              >
                <Columns2 className="w-3 h-3" />
                <span>{compareView === 'slider' ? 'Xem song song' : 'Xem thanh kéo'}</span>
              </button>
            </div>
          )}

          {resultImage && compareView === 'slider' ? (
            <BeforeAfterSlider
              beforeSrc={personPreview}
              afterSrc={resultImage}
              beforeLabel="Ảnh gốc"
              afterLabel={garment?.name || 'Việt Phục'}
            />
          ) : (
            <div className={`grid gap-3 ${resultImage ? 'grid-cols-2' : 'grid-cols-1'}`}>
              <div className="bg-white p-2 rounded-xl border border-border-warm text-center">
                <span className="text-[11px] font-bold text-[#574C43] uppercase block mb-1">Ảnh gốc</span>
                <img
                  src={personPreview}
                  alt="Ảnh gốc người dùng"
                  className="w-full max-h-72 object-contain rounded-lg mx-auto"
                />
              </div>

              {resultImage && (
                <div className="bg-white p-2 rounded-xl border-2 border-[#C9A227] text-center">
                  <span className="text-[11px] font-bold text-[#8B1A1A] uppercase block mb-1">
                    Kết quả AI • {garment?.name}
                  </span>
                  <img
                    src={resultImage}
                    alt="Kết quả thử Việt phục"
                    className="w-full max-h-72 object-contain rounded-lg mx-auto"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Thẻ Gợi ý từ AI Stylist Soi Tông Da (hoạt động 24/7 trên Free Tier) */}
      {stylistAdvice && (
        <div className="bg-white rounded-2xl p-3.5 border-2 border-[#C9A227]/70 shadow-xs space-y-2 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 font-bold text-[#1D2440]">
              <Wand2 className="w-4 h-4 text-[#8B1A1A]" />
              <span>AI Stylist Soi Tông Da &amp; Dáng</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="px-2 py-0.5 rounded-full bg-[#FAF3DD] text-[#664422] font-bold border border-[#E2D2B5]">
                Da: {stylistAdvice.skinTone}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-surface-muted text-[#1D2440] font-bold">
                {stylistAdvice.undertone}
              </span>
            </div>
          </div>

          <p className="text-[#2C241D] leading-relaxed">{stylistAdvice.reason}</p>

          {stylistAdvice.isCloseUp && (
            <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>Ảnh này chụp khá cận mặt — khi ghép GPU thật, bạn nên dùng ảnh chụp từ eo trở lên để thấy trọn dáng tà áo.</span>
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-gray-100">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#574C43]">
              {suggestedOuter && (
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                  style={{ backgroundColor: suggestedOuter.hex }}
                />
              )}
              <span>
                Đề xuất: <strong className="text-[#1D2440]">{suggestedGarment?.name || stylistAdvice.suggestedGarmentId}</strong> •{' '}
                <strong className="text-[#8B1A1A]">{suggestedOuter?.name || stylistAdvice.suggestedOuterColorId}</strong>
                {suggestedBottom ? ` / ${suggestedBottom.name}` : ''}
              </span>
            </div>

            {onApplyStylistOutfit && (
              <button
                type="button"
                onClick={() =>
                  onApplyStylistOutfit({
                    garmentId: stylistAdvice.suggestedGarmentId,
                    outerColorId: stylistAdvice.suggestedOuterColorId,
                    bottomColorId: stylistAdvice.suggestedBottomColorId
                  })
                }
                className="px-3 py-1.5 rounded-xl bg-[#8B1A1A] text-white text-[11px] font-bold hover:brightness-110 transition whitespace-nowrap"
              >
                Áp dụng gợi ý AI
              </button>
            )}
          </div>
        </div>
      )}

      {/* Thông báo văn minh khi GPU Colab đang nghỉ (không vẽ 2D đè mặt) */}
      {gpuNotice && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-2">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
            <span>{gpuNotice}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowDemoConfig(true)}
              className="px-3 py-1.5 rounded-lg bg-[#1D2440] text-white text-[11px] font-bold"
            >
              Dán Link GPU Colab
            </button>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={!personPreview || loading}
          onClick={handleRunTryOn}
          className="flex-1 min-h-[40px] py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#8B1A1A] to-[#C9A227] hover:brightness-105 disabled:opacity-40 transition flex items-center justify-center gap-2 shadow"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>
            {loading
              ? progressText || 'Đang xử lý...'
              : colabConnected
                ? `Ghép GPU thật: ${garment?.name}`
                : `Phân tích AI Stylist (${garment?.name})`}
          </span>
        </button>

        {resultImage && (
          <a
            href={resultImage}
            download={`VietPhucRemix-AI-TryOn.png`}
            className="min-h-[40px] py-2.5 px-4 rounded-xl font-bold text-xs bg-[#1D2440] text-white flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Tải ảnh</span>
          </a>
        )}
      </div>
    </div>
  );
}
