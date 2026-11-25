import React, { useMemo } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { recommendOutfits } from '../engines/recommendEngine';

export function SuggestionPanel({
  eventId,
  eventName,
  gender,
  mode,
  region,
  selectedStyle,
  onApplyOutfit
}) {
  const suggestions = useMemo(
    () =>
      recommendOutfits({
        eventId,
        gender,
        mode,
        region,
        style: selectedStyle
      }),
    [eventId, gender, mode, region, selectedStyle]
  );

  if (suggestions.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-[#DECDB8] p-3.5 shadow-sm space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <Sparkles className="w-4 h-4 text-[#C9A227] shrink-0" />
          <h4 className="font-bold text-xs sm:text-sm text-[#1D2440] truncate">
            3 Gợi ý chuẩn cho {eventName}
          </h4>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 whitespace-nowrap shrink-0">
          0 vi phạm đỏ
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {suggestions.map((item, idx) => {
          const shortName = item.garmentName.replace(/\s*\(.*?\)/g, '');
          return (
            <button
              key={`${item.outfit.garmentId}-${item.outfit.outerColorId}-${idx}`}
              type="button"
              onClick={() => onApplyOutfit(item.outfit)}
              title={`${item.garmentName} • ${item.outerColorName}`}
              className="text-left p-2.5 rounded-xl border border-[#E6DBCE] bg-[#FAF7F2] hover:border-[#8B1A1A] hover:bg-white transition group"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-1">
                  <span
                    className="w-3 h-3 rounded-full border border-black/20"
                    style={{ backgroundColor: item.outerHex }}
                  />
                  <span
                    className="w-3 h-3 rounded-full border border-black/20"
                    style={{ backgroundColor: item.bottomHex }}
                  />
                </div>
                <span className="text-[11px] font-bold text-[#8B1A1A] flex items-center gap-0.5 whitespace-nowrap">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {item.harmonyScore}đ
                </span>
              </div>
              <p className="font-bold text-xs text-[#1D2440] truncate group-hover:text-[#8B1A1A]">
                {shortName}
              </p>
              <p className="text-[11px] text-[#574C43] truncate">{item.outerColorName}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
