import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle2, Wand2, BookOpen } from 'lucide-react';

export function CultureGuardBanner({
  cultureResult,
  onAutoFix,
  onOpenCultureCard
}) {
  const { status, levelText, activeRule } = cultureResult;

  const isRed = status === 'red';
  const isYellow = status === 'yellow';
  const isGreen = status === 'green';

  const themeStyles = isRed
    ? {
        container: 'bg-rose-50 border-rose-300 text-rose-950',
        badge: 'bg-rose-600 text-white',
        icon: <ShieldAlert className="w-5 h-5 text-rose-600 animate-pulse" />,
        accentBtn: 'bg-rose-700 hover:bg-rose-800 text-white'
      }
    : isYellow
    ? {
        container: 'bg-amber-50 border-amber-300 text-amber-950',
        badge: 'bg-amber-600 text-white',
        icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
        accentBtn: 'bg-amber-700 hover:bg-amber-800 text-white'
      }
    : {
        container: 'bg-emerald-50 border-emerald-300 text-emerald-950',
        badge: 'bg-emerald-600 text-white',
        icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
        accentBtn: 'bg-emerald-700 hover:bg-emerald-800 text-white'
      };

  return (
    <div
      className={`w-full rounded-2xl border-2 p-4 transition-all duration-300 shadow-sm ${themeStyles.container}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Status Header */}
        <div className="flex items-center gap-2.5">
          {themeStyles.icon}
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${themeStyles.badge}`}>
                Culture Guard: {levelText}
              </span>
            </div>
            <h4 className="font-bold text-sm sm:text-base mt-0.5">
              {activeRule.title}
            </h4>
          </div>
        </div>

        {/* Action Button (Auto-Fix or Learn More) */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          {activeRule.autoFix && (
            <button
              onClick={() => onAutoFix(activeRule.autoFix)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${themeStyles.accentBtn}`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Tự Động Chuẩn Hóa</span>
            </button>
          )}

          <button
            onClick={onOpenCultureCard}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-gray-700 bg-white/80 hover:bg-white border border-gray-200 transition"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Nguồn gốc</span>
          </button>
        </div>
      </div>

      {/* Message and Historical Evidence */}
      <p className="mt-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
        {activeRule.message}
      </p>

      {activeRule.quote && (
        <div className="mt-2.5 pt-2 border-t border-black/10 flex items-start gap-2 text-xs italic text-gray-700 font-sans font-medium">
          <span className="text-base leading-none text-[#8B1A1A]">“</span>
          <p className="leading-relaxed">{activeRule.quote}</p>
        </div>
      )}
    </div>
  );
}

