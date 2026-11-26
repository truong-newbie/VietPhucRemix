import React, { useMemo } from 'react';
import { Users, Plus, Trash2, Sparkles } from 'lucide-react';
import { AvatarStage } from './AvatarStage';
import { GARMENTS_DATA } from '../data/garmentsData';
import { COLOR_PALETTE, ELEMENT_RELATIONS } from '../data/colorsData';
import { ACCESSORIES_DATA } from '../data/accessoriesData';

const garmentsMap = Object.fromEntries(GARMENTS_DATA.map((g) => [g.id, g]));
const colorsMap = Object.fromEntries(COLOR_PALETTE.map((c) => [c.id, c]));
const headMap = Object.fromEntries(ACCESSORIES_DATA.head.map((a) => [a.id, a]));
const handMap = Object.fromEntries(ACCESSORIES_DATA.hand.map((a) => [a.id, a]));
const footMap = Object.fromEntries(ACCESSORIES_DATA.foot.map((a) => [a.id, a]));

function computeFamilyHarmony(members) {
  if (!members || members.length < 2) return { score: 85, label: 'Đồng bộ hài hòa' };
  const elements = members.map((m) => colorsMap[m.outfit.outerColorId]?.element).filter(Boolean);
  let clashes = 0;
  let harmonies = 0;
  for (let i = 0; i < elements.length; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      const a = elements[i];
      const b = elements[j];
      if (a === b || ELEMENT_RELATIONS.generating[a] === b || ELEMENT_RELATIONS.generating[b] === a) {
        harmonies++;
      } else if (ELEMENT_RELATIONS.overcoming[a] === b || ELEMENT_RELATIONS.overcoming[b] === a) {
        clashes++;
      }
    }
  }
  const score = Math.min(99, Math.max(55, 80 + harmonies * 5 - clashes * 10));
  return {
    score,
    label: clashes === 0 ? 'Gia đình Ngũ Hành tương sinh cát tường' : 'Có màu tương khắc nhẹ giữa các thành viên'
  };
}

export function FamilyStageView({
  members,
  activeIndex,
  onSelectMember,
  onAddMember,
  onRemoveMember
}) {
  const familyHarmony = useMemo(() => computeFamilyHarmony(members), [members]);

  return (
    <div className="rounded-2xl bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#EBE4D5] border border-border-subtle shadow-xl p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#8B1A1A]" />
          <span className="font-bold text-xs sm:text-sm text-[#1D2440]">
            Family Lookbook ({members.length}/4 thành viên)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
            <Sparkles className="w-3 h-3 text-[#C9A227]" />
            Đồng bộ: {familyHarmony.score}/100đ
          </span>

          {members.length < 4 && (
            <button
              type="button"
              onClick={onAddMember}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#8B1A1A] hover:bg-[#A62626] text-white transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm người</span>
            </button>
          )}
        </div>
      </div>

      <p className="text-[11px] text-[#664422]">{familyHarmony.label} • Bấm vào nhân vật để chỉnh trang phục ở bảng bên trái.</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 items-end">
        {members.map((m, idx) => {
          const isActive = idx === activeIndex;
          const o = m.outfit;
          const garment = garmentsMap[o.garmentId] || GARMENTS_DATA[0];
          const isChild = m.role === 'son' || m.role === 'daughter';

          return (
            <div
              key={`${m.role}-${idx}`}
              className={`relative rounded-2xl p-1.5 border-2 transition cursor-pointer ${
                isActive
                  ? 'border-[#8B1A1A] bg-white shadow-md ring-2 ring-[#8B1A1A]/20'
                  : 'border-border-subtle bg-white/60 hover:bg-white'
              }`}
              onClick={() => onSelectMember(idx)}
            >
              <div className="flex items-center justify-between px-1 mb-1">
                <span className={`text-[11px] font-bold ${isActive ? 'text-[#8B1A1A]' : 'text-[#1D2440]'}`}>
                  {m.label}
                </span>
                {members.length > 2 && (
                  <button
                    type="button"
                    aria-label={`Xóa ${m.label}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveMember(idx);
                    }}
                    className="p-0.5 rounded hover:bg-rose-100 text-gray-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className={isChild ? 'scale-90 origin-bottom' : ''}>
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

              <p className="text-[11px] text-center font-semibold text-gray-600 truncate mt-1">
                {garment.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
