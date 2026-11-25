import React, { useState } from 'react';
import { Camera, Upload, Sparkles, Download, KeyRound, AlertCircle, Loader2 } from 'lucide-react';
import { compressImageFile } from '../utils/imageCompressor';

export function TryOnStage({
  garment,
  outerColor,
  bottomColor,
  headAccessory,
  footAccessory,
  onTryOnSuccess
}) {
  const [personPreview, setPersonPreview] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [judgePasscode, setJudgePasscode] = useState('');
  const [showPasscodeBox, setShowPasscodeBox] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg('');
    setResultImage(null);
    try {
      const compressed = await compressImageFile(file, 1280, 0.85);
      setPersonPreview(compressed);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleRunTryOn = async () => {
    if (!personPreview) return;
    setLoading(true);
    setErrorMsg('');
    setProgressText('Đang phân tích dáng người & cấu trúc tà áo Việt phục...');

    const progressTimer = setTimeout(() => {
      setProgressText('Đang dệt sắc màu Ngũ Hành lên ảnh chân dung (khoảng 8–18 giây)...');
    }, 4500);

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (judgePasscode.trim()) {
        headers['x-judge-passcode'] = judgePasscode.trim();
      }

      const resp = await fetch('/api/try-on', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          personImageDataUrl: personPreview,
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
        throw new Error(data.error || 'Không thể tạo ảnh thử đồ AI.');
      }

      setResultImage(data.imageUrl);
      if (onTryOnSuccess) onTryOnSuccess(data.imageUrl);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      clearTimeout(progressTimer);
      setLoading(false);
      setProgressText('');
    }
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-[#FAF7F2] to-[#EFE8DC] border border-[#E0D5C1] shadow-xl p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-[#8B1A1A]" />
          <h4 className="font-bold text-sm text-[#1D2440]">
            AI Thử Đồ Ảnh Thật (Virtual Try-On)
          </h4>
        </div>
        <button
          type="button"
          onClick={() => setShowPasscodeBox((v) => !v)}
          className="flex items-center gap-1 text-[11px] font-semibold text-[#664422] hover:text-[#8B1A1A]"
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Mã Giám khảo</span>
        </button>
      </div>

      {showPasscodeBox && (
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-[#DECDB8]">
          <input
            type="password"
            value={judgePasscode}
            onChange={(e) => setJudgePasscode(e.target.value)}
            placeholder="Nhập mã Giám khảo (mở khóa không giới hạn lượt)..."
            className="flex-1 text-xs px-2 py-1 focus:outline-hidden"
          />
        </div>
      )}

      {/* Upload Dropzone */}
      <label className="block border-2 border-dashed border-[#C9A227] rounded-2xl p-4 text-center bg-white/80 hover:bg-white cursor-pointer transition">
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        <Upload className="w-6 h-6 text-[#8B1A1A] mx-auto mb-1.5" />
        <p className="text-xs font-bold text-[#1D2440]">
          {personPreview ? 'Đổi ảnh chân dung khác' : 'Tải lên ảnh chân dung rõ mặt (toàn thân càng đẹp)'}
        </p>
        <p className="text-[11px] text-gray-500 mt-0.5">
          Ảnh được tự động nén gọn trên máy trước khi gửi sang AI Serverless
        </p>
      </label>

      {/* Before / After Preview */}
      {personPreview && (
        <div className={`grid gap-3 ${resultImage ? 'grid-cols-2' : 'grid-cols-1'}`}>
          <div className="bg-white p-2 rounded-xl border border-[#DECDB8] text-center">
            <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Ảnh gốc</span>
            <img src={personPreview} alt="Ảnh gốc người dùng" className="w-full max-h-72 object-contain rounded-lg mx-auto" />
          </div>

          {resultImage && (
            <div className="bg-white p-2 rounded-xl border-2 border-[#C9A227] text-center">
              <span className="text-[10px] font-bold text-[#8B1A1A] uppercase block mb-1">
                Kết quả AI • {garment?.name}
              </span>
              <img src={resultImage} alt="Kết quả thử Việt phục" className="w-full max-h-72 object-contain rounded-lg mx-auto" />
            </div>
          )}
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
          className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#8B1A1A] to-[#C9A227] hover:brightness-105 disabled:opacity-40 transition flex items-center justify-center gap-2 shadow"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>{loading ? progressText || 'Đang xử lý...' : `Thử ngay ${garment?.name}`}</span>
        </button>

        {resultImage && (
          <a
            href={resultImage}
            download={`VietPhucRemix-AI-TryOn.png`}
            className="py-2.5 px-4 rounded-xl font-bold text-xs bg-[#1D2440] text-white flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Tải ảnh</span>
          </a>
        )}
      </div>
    </div>
  );
}
