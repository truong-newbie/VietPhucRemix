import React, { useState, useMemo } from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Wand2, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { ACCESSORIES_DATA } from '../data/accessoriesData';
import { classifyCreativity } from '../engines/creativityClassifier';

export function CultureGuardBanner({
  cultureResult,
  cultureState,
  onAutoFix,
  onOpenCultureCard
}) {
  const [showMoreRules, setShowMoreRules] = useState(false);
  const { status, levelText, activeRule, allMatched = [], combinedAutoFix } = cultureResult;

  const accessoriesMap = useMemo(
    () => ({
      head: Object.fromEntries(ACCESSORIES_DATA.head.map((a) => [a.id, a])),
      hand: Object.fromEntries(ACCESSORIES_DATA.hand.map((a) => [a.id, a])),
      foot: Object.fromEntries(ACCESSORIES_DATA.foot.map((a) => [a.id, a]))
    }),
    []
  );

  const creativity = useMemo(
    () => (cultureState ? classifyCreativity(cultureState, cultureResult, accessoriesMap) : null),
    [cultureState, cultureResult, accessoriesMap]
  );

  const isRed = status === 'red';
  const isYellow = status === 'yellow';

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

  const fixToApply = combinedAutoFix || activeRule.autoFix;
  const extraRules = allMatched.slice(1);
  const showSource = activeRule.source && activeRule.source !== 'CẦN THẨM ĐỊNH';

  return (
    <div className={`rounded-2xl border-2 p-4 shadow-sm transition-all duration-300 ${themeStyles.container}`}>
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          {themeStyles.icon}
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${themeStyles.badge}`}>
                {levelText}
              </span>
              {creativity && (
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${creativity.badgeClass}`}>
                  {creativity.label}
                </span>
              )}
            </div>
            <h3 className="font-bold text-sm sm:text-base leading-snug mt-0.5">
              {activeRule.title}
            </h3>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {fixToApply && (
            <button
              onClick={() => onAutoFix(fixToApply)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm transition transform active:scale-95 ${themeStyles.accentBtn}`}
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
        <div className="mt-2.5 pt-2 border-t border-black/10 text-xs italic text-gray-700 font-sans font-medium">
          <p className="leading-relaxed">{activeRule.quote}</p>
        </div>
      )}

      {showSource && (
        <p className="mt-1 text-[11px] text-gray-500">
          Nguồn tham chiếu: <span className="font-semibold">{activeRule.source}</span>
        </p>
      )}

      {/* Expandable extra matched rules */}
      {extraRules.length > 0 && (
        <div className="mt-2.5 pt-2 border-t border-black/10">
          <button
            type="button"
            onClick={() => setShowMoreRules((v) => !v)}
            className="flex items-center gap-1 text-xs font-bold text-gray-700 hover:text-black transition"
          >
            {showMoreRules ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>Còn {extraRules.length} lưu ý khác</span>
          </button>

          {showMoreRules && (
            <ul className="mt-2 space-y-1.5 text-xs">
              {extraRules.map((r) => (
                <li key={r.id} className="flex items-start gap-2 bg-white/70 rounded-lg px-2.5 py-1.5 border border-black/5">
                  <span
                    className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                      r.level === 'red' ? 'bg-rose-600' : r.level === 'yellow' ? 'bg-amber-500' : 'bg-emerald-600'
                    }`}
                  />
                  <div>
                    <span className="font-semibold text-gray-900">{r.title}</span>
                    <p className="text-[11px] text-gray-600">{r.suggestion || r.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
