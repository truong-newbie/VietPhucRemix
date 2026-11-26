import React, { useEffect, useRef } from 'react';
import { Trophy, CheckCircle2, Circle, X, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { evaluateChallenge } from '../engines/challengeEvaluator';

export function ChallengeBanner({
  challenge,
  outfit,
  cultureResult,
  harmonyResult,
  onComplete,
  onNextChallenge,
  onClose
}) {
  const celebratedRef = useRef(null);
  const result = evaluateChallenge(challenge, { outfit, cultureResult, harmonyResult });

  useEffect(() => {
    if (challenge && result.passed && celebratedRef.current !== challenge.id) {
      celebratedRef.current = challenge.id;
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.55 },
        colors: ['#8B1A1A', '#C9A227', '#1F6F5C', '#F9D423']
      });
      if (onComplete) onComplete(challenge);
    }
  }, [challenge, result.passed, onComplete]);

  if (!challenge) return null;

  return (
    <div
      className={`rounded-2xl p-3.5 border-2 shadow-sm transition space-y-2 text-xs ${
        result.passed
          ? 'bg-emerald-50 border-emerald-400'
          : 'bg-[#FAF3DD] border-[#C9A227]'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Trophy className={`w-4 h-4 shrink-0 ${result.passed ? 'text-emerald-600' : 'text-[#8B1A1A]'}`} />
          <div>
            <span className="text-[11px] font-bold uppercase text-[#8B1A1A] block">
              {result.passed ? 'Hoàn thành thử thách • Đã trao huy hiệu!' : 'Thử thách Phối Chuẩn Thực Hành'}
            </span>
            <h4 className="font-bold text-sm text-[#1D2440]">{challenge.title}</h4>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Thoát thử thách"
          className="p-1 rounded-lg text-[#574C43] hover:bg-black/5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[#2C241D] leading-snug">{challenge.brief}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
        {result.checklist.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-1.5 text-[11px] font-semibold ${
              item.ok ? 'text-emerald-800' : 'text-[#574C43]'
            }`}
          >
            {item.ok ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            ) : (
              <Circle className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            )}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {result.passed && onNextChallenge && (
        <div className="pt-1 flex justify-end">
          <button
            type="button"
            onClick={onNextChallenge}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1F6F5C] text-white font-bold text-xs hover:brightness-110 transition"
          >
            <span>Thử thách tiếp theo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
