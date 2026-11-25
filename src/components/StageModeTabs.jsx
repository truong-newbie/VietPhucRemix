import React from 'react';
import { Layers, Box, Camera } from 'lucide-react';

const TABS = [
  { id: '2d', label: '2D Nhanh', icon: Layers },
  { id: '3d', label: '3D 360°', icon: Box },
  { id: 'tryon', label: 'AI Thử Ảnh', icon: Camera }
];

export function StageModeTabs({ activeMode, onChange }) {
  return (
    <div className="scroll-mt-20 flex items-center gap-1 bg-[#EFE8DC] p-1 rounded-xl border border-[#DECDB8] shadow-inner">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const active = activeMode === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex-1 min-h-[40px] flex items-center justify-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
              active
                ? 'bg-[#8B1A1A] text-white shadow-xs'
                : 'text-[#664422] hover:bg-white/60 hover:text-[#1D2440]'
            }`}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
