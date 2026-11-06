import React, { useState } from 'react';
import { Calendar, Shirt, Palette, Sparkles, CloudSun, Check, SlidersHorizontal } from 'lucide-react';
import { EVENTS_DATA } from '../data/eventsData';
import { GARMENTS_DATA } from '../data/garmentsData';
import { COLOR_PALETTE } from '../data/colorsData';
import { ACCESSORIES_DATA } from '../data/accessoriesData';

export function StudioControls({
  selectedEventId,
  onSelectEvent,
  selectedGarmentId,
  onSelectGarment,
  selectedOuterColorId,
  onSelectOuterColor,
  selectedBottomColorId,
  onSelectBottomColor,
  selectedBeltColorId,
  onSelectBeltColor,
  selectedHeadId,
  onSelectHead,
  selectedHandId,
  onSelectHand,
  selectedFootId,
  onSelectFoot
}) {
  const [activeTab, setActiveTab] = useState('garment'); // 'event' | 'garment' | 'color' | 'accessories'

  const currentEvent = EVENTS_DATA.find(e => e.id === selectedEventId) || EVENTS_DATA[0];

  return (
    <div className="bg-white rounded-2xl border border-[#DECDB8] shadow-md overflow-hidden flex flex-col">
      {/* Tab Navigation Headers */}
      <div className="flex border-b border-[#E6DBCE] bg-[#FAF7F2] p-1.5 gap-1 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('event')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition shrink-0 ${
            activeTab === 'event'
              ? 'bg-[#8B1A1A] text-white shadow-sm'
              : 'text-[#664422] hover:bg-black/5'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>1. Sự Kiện</span>
        </button>

        <button
          onClick={() => setActiveTab('garment')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition shrink-0 ${
            activeTab === 'garment'
              ? 'bg-[#8B1A1A] text-white shadow-sm'
              : 'text-[#664422] hover:bg-black/5'
          }`}
        >
          <Shirt className="w-3.5 h-3.5" />
          <span>2. Cổ Phục</span>
        </button>

        <button
          onClick={() => setActiveTab('color')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition shrink-0 ${
            activeTab === 'color'
              ? 'bg-[#8B1A1A] text-white shadow-sm'
              : 'text-[#664422] hover:bg-black/5'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>3. Màu Sắc</span>
        </button>

        <button
          onClick={() => setActiveTab('accessories')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition shrink-0 ${
            activeTab === 'accessories'
              ? 'bg-[#8B1A1A] text-white shadow-sm'
              : 'text-[#664422] hover:bg-black/5'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>4. Phụ Kiện</span>
        </button>
      </div>

      {/* Tab 1: Event & Weather Context */}
      {activeTab === 'event' && (
        <div className="p-4 space-y-4">
          {/* Weather Callout */}
          <div className="bg-[#FAF3DD]/80 rounded-xl p-3 border border-[#E8DFC8] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CloudSun className="w-4 h-4 text-[#C9A227]" />
              <div>
                <span className="font-bold text-[#664422]">
                  Dự báo sự kiện: {currentEvent.weather.temp} – {currentEvent.weather.desc}
                </span>
                <p className="text-[11px] text-[#8C5E3B]">{currentEvent.weather.advice}</p>
              </div>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white text-[#664422] border border-[#DECDB8]">
              Thời tiết gợi ý
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
            {EVENTS_DATA.map(event => {
              const isSelected = event.id === selectedEventId;
              return (
                <button
                  key={event.id}
                  onClick={() => onSelectEvent(event.id)}
                  className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#8B1A1A] bg-[#8B1A1A]/5 ring-1 ring-[#8B1A1A]'
                      : 'border-[#E6DBCE] hover:border-[#8B1A1A]/40 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#8C5E3B] uppercase block">
                        {event.category}
                      </span>
                      <h5 className="font-bold text-sm text-[#1D2440]">{event.name}</h5>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#8B1A1A] shrink-0" />}
                  </div>
                  <p className="text-[11px] text-gray-600 mt-1 line-clamp-2">{event.etiquette}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Heritage Garment Selector */}
      {activeTab === 'garment' && (
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-1 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
            {GARMENTS_DATA.map(garment => {
              const isSelected = garment.id === selectedGarmentId;
              return (
                <button
                  key={garment.id}
                  onClick={() => onSelectGarment(garment.id)}
                  className={`p-3.5 rounded-xl border text-left transition flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'border-[#8B1A1A] bg-[#8B1A1A]/5 ring-2 ring-[#8B1A1A]/60 shadow-sm'
                      : 'border-[#E6DBCE] hover:border-[#8B1A1A]/40 bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-sm text-[#1D2440]">{garment.name}</h5>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFE8DC] text-[#664422]">
                        {garment.era.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-snug">{garment.silhouette}</p>
                    <p className="text-[11px] text-[#8C5E3B] font-medium pt-0.5">
                      💡 {garment.philosophy}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#8B1A1A] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Color Palette Picker */}
      {activeTab === 'color' && (
        <div className="p-4 space-y-4">
          {/* 1. Outer Color (Áo chính) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                1. Sắc áo chính (Outer Garment)
              </span>
              <span className="text-xs font-medium text-[#8B1A1A]">
                {COLOR_PALETTE.find(c => c.id === selectedOuterColorId)?.name}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {COLOR_PALETTE.map(color => {
                const isSelected = color.id === selectedOuterColorId;
                return (
                  <button
                    key={color.id}
                    onClick={() => onSelectOuterColor(color.id)}
                    className={`h-11 rounded-xl relative flex flex-col items-center justify-center transition-all ${
                      isSelected ? 'ring-2 ring-black scale-105 shadow-md' : 'hover:opacity-90'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={`${color.name} (Hành ${color.element})`}
                  >
                    {isSelected && (
                      <Check className={`w-4 h-4 ${color.textDark ? 'text-black' : 'text-white'}`} />
                    )}
                    <span className={`text-[9px] font-bold absolute bottom-0.5 ${color.textDark ? 'text-black/80' : 'text-white/80'}`}>
                      {color.element}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Bottom Color (Quần suông / Váy lĩnh) */}
          <div className="pt-2 border-t border-[#E6DBCE]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                2. Màu Quần lụa / Chân váy
              </span>
              <span className="text-xs font-medium text-[#8B1A1A]">
                {COLOR_PALETTE.find(c => c.id === selectedBottomColorId)?.name}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {COLOR_PALETTE.map(color => {
                const isSelected = color.id === selectedBottomColorId;
                return (
                  <button
                    key={color.id}
                    onClick={() => onSelectBottomColor(color.id)}
                    className={`h-9 rounded-xl relative flex items-center justify-center transition-all ${
                      isSelected ? 'ring-2 ring-black scale-105 shadow-md' : 'hover:opacity-90'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={`${color.name} (Hành ${color.element})`}
                  >
                    {isSelected && (
                      <Check className={`w-3.5 h-3.5 ${color.textDark ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Belt Color (Dải thắt lưng / Khăn bao) */}
          <div className="pt-2 border-t border-[#E6DBCE]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                3. Thắt lưng / Khăn bao ngũ sắc
              </span>
              <span className="text-xs font-medium text-[#8B1A1A]">
                {COLOR_PALETTE.find(c => c.id === selectedBeltColorId)?.name}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {COLOR_PALETTE.map(color => {
                const isSelected = color.id === selectedBeltColorId;
                return (
                  <button
                    key={color.id}
                    onClick={() => onSelectBeltColor(color.id)}
                    className={`h-8 rounded-lg relative flex items-center justify-center transition-all ${
                      isSelected ? 'ring-2 ring-black scale-105 shadow-sm' : 'hover:opacity-90'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {isSelected && (
                      <Check className={`w-3 h-3 ${color.textDark ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Accessories Wardrobe */}
      {activeTab === 'accessories' && (
        <div className="p-4 space-y-4 max-h-[420px] overflow-y-auto">
          {/* 1. Mũ / Phụ kiện đầu */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
              Mũ & Phụ Kiện Đầu
            </span>
            <div className="grid grid-cols-2 gap-2">
              {ACCESSORIES_DATA.head.map(item => {
                const isSelected = item.id === selectedHeadId;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectHead(item.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition ${
                      isSelected
                        ? 'border-[#8B1A1A] bg-[#8B1A1A]/10 font-bold text-[#8B1A1A]'
                        : 'border-[#E6DBCE] hover:border-gray-400 bg-white text-gray-700'
                    }`}
                  >
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Cầm tay */}
          <div className="pt-2 border-t border-[#E6DBCE]">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
              Phụ Kiện Cầm Tay
            </span>
            <div className="grid grid-cols-2 gap-2">
              {ACCESSORIES_DATA.hand.map(item => {
                const isSelected = item.id === selectedHandId;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectHand(item.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition ${
                      isSelected
                        ? 'border-[#8B1A1A] bg-[#8B1A1A]/10 font-bold text-[#8B1A1A]'
                        : 'border-[#E6DBCE] hover:border-gray-400 bg-white text-gray-700'
                    }`}
                  >
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Giày dép */}
          <div className="pt-2 border-t border-[#E6DBCE]">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
              Giày & Guốc (Bắt trend Remix)
            </span>
            <div className="grid grid-cols-2 gap-2">
              {ACCESSORIES_DATA.foot.map(item => {
                const isSelected = item.id === selectedFootId;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectFoot(item.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition ${
                      isSelected
                        ? 'border-[#8B1A1A] bg-[#8B1A1A]/10 font-bold text-[#8B1A1A]'
                        : 'border-[#E6DBCE] hover:border-gray-400 bg-white text-gray-700'
                    }`}
                  >
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

