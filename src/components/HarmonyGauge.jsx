import React from 'react';
import { Palette, Flame, CheckCircle, Info } from 'lucide-react';

export function HarmonyGauge({ harmonyResult }) {
  const { score, rating, badgeColor, explanations } = harmonyResult;

  // Calculate stroke dash for SVG circle gauge
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-[#FAF7F2] rounded-2xl border border-[#E0D5C1] p-4 shadow-sm flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#8B1A1A]" />
          <h4 className="font-bold text-sm text-[#1D2440]">Thước Đo Hài Hòa (Harmony Score)</h4>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeColor}`}>
          {rating}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Circular Progress Gauge */}
        <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke="#E8DFC8"
              strokeWidth="6"
            />
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke={score >= 85 ? '#1F6F5C' : score >= 60 ? '#C9A227' : '#8B1A1A'}
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-black text-[#1D2440] leading-none">
              {score}
            </span>
            <span className="text-[9px] text-gray-500 font-semibold uppercase">Điểm</span>
          </div>
        </div>

        {/* Harmony Insights */}
        <div className="flex-1 text-xs space-y-1.5">
          {explanations.slice(0, 2).map((exp, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-gray-700">
              <CheckCircle className="w-3.5 h-3.5 text-[#1F6F5C] shrink-0 mt-0.5" />
              <p className="leading-snug">{exp}</p>
            </div>
          ))}
          {explanations.length === 0 && (
            <p className="text-gray-500 italic">Chọn các màu sắc để đo độ tương sinh ngũ hành.</p>
          )}
        </div>
      </div>
    </div>
  );
}

