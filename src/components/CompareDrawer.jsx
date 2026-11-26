import React from 'react';
import { X, Trash2, Trophy, Check } from 'lucide-react';
import { AvatarStage } from './AvatarStage';
import { GARMENTS_DATA } from '../data/garmentsData';
import { COLOR_PALETTE } from '../data/colorsData';
import { ACCESSORIES_DATA } from '../data/accessoriesData';

const garmentsMap = Object.fromEntries(GARMENTS_DATA.map((g) => [g.id, g]));
const colorsMap = Object.fromEntries(COLOR_PALETTE.map((c) => [c.id, c]));
const headMap = Object.fromEntries(ACCESSORIES_DATA.head.map((a) => [a.id, a]));
const handMap = Object.fromEntries(ACCESSORIES_DATA.hand.map((a) => [a.id, a]));
const footMap = Object.fromEntries(ACCESSORIES_DATA.foot.map((a) => [a.id, a]));

export function CompareDrawer({
  isOpen,
  onClose,
  savedOutfits,
  onSelectOutfit,
  onRemoveOutfit,
  onClearAll
}) {
  if (!isOpen) return null;

  const maxScore = savedOutfits.reduce((max, item) => Math.max(max, item.harmonyScore || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-surface-subtle rounded-3xl border-2 border-[#C9A227] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        <div className="bg-gradient-to-r from-[#1D2440] to-[#2C365E] text-white p-4 flex items-center justify-between border-b-2 border-[#C9A227]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#F9D423] block">
              So sánh phương án phối đồ (Tối đa 3 bộ)
            </span>
            <h3 className="font-bold text-base sm:text-lg">
              Khay Đối Chiếu Phương Án A / B / C
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {savedOutfits.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-rose-200 transition"
              >
                Xóa tất cả
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng so sánh"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          {savedOutfits.length === 0 ? (
            <div className="py-12 text-center space-y-2 text-gray-500">
              <p className="text-sm font-semibold">Chưa có bộ phối nào được lưu để so sánh.</p>
              <p className="text-xs">Hãy bấm nút “Lưu so sánh” ngay dưới sân khấu để thêm phương án A, B, C.</p>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
              {savedOutfits.map((item, index) => {
                const o = item.outfit;
                const garment = garmentsMap[o.garmentId] || GARMENTS_DATA[0];
                const isBest = item.harmonyScore === maxScore && maxScore > 0;
                const label = String.fromCharCode(65 + index); // A, B, C

                return (
                  <div
                    key={item.id}
                    className={`min-w-[240px] flex-1 snap-center rounded-2xl bg-white p-3 border-2 flex flex-col justify-between gap-3 ${
                      isBest ? 'border-[#C9A227] shadow-md' : 'border-border-subtle'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#1D2440] text-white">
                        Phương án {label}
                      </span>
                      {isBest && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          <Trophy className="w-3 h-3" />
                          Cao nhất
                        </span>
                      )}
                    </div>

                    <div className="w-full max-w-[180px] mx-auto">
                      <AvatarStage
                        compact
                        garment={garment}
                        outerColor={colorsMap[o.outerColorId]}
                        innerColor={colorsMap['trang-su']}
                        bottomColor={colorsMap[o.bottomColorId]}
                        beltColor={colorsMap[o.beltColorId]}
                        headAccessory={headMap[o.headId]}
                        handAccessory={handMap[o.handId]}
                        footAccessory={footMap[o.footId]}
                        gender={o.gender}
                      />
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#8B1A1A]">{garment.name}</span>
                        <span className="font-bold text-[#1D2440]">{item.harmonyScore}/100đ</span>
                      </div>
                      <p className="text-[11px] text-gray-600">
                        Culture Guard:{' '}
                        <strong
                          className={
                            item.cultureStatus === 'red'
                              ? 'text-rose-600'
                              : item.cultureStatus === 'yellow'
                              ? 'text-amber-600'
                              : 'text-emerald-600'
                          }
                        >
                          {item.cultureStatus === 'red'
                            ? 'Đèn Đỏ'
                            : item.cultureStatus === 'yellow'
                            ? 'Đèn Vàng'
                            : 'Đèn Xanh'}
                        </strong>
                      </p>
                      <p className="text-[11px] text-gray-500 truncate">
                        {headMap[o.headId]?.name} • {footMap[o.footId]?.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectOutfit(o);
                          onClose();
                        }}
                        className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-[#8B1A1A] hover:bg-[#A62626] text-white flex items-center justify-center gap-1 transition"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Dùng bộ này</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveOutfit(item.id)}
                        aria-label={`Xóa phương án ${label}`}
                        className="p-2 rounded-xl bg-gray-100 hover:bg-rose-100 text-gray-600 hover:text-rose-700 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
