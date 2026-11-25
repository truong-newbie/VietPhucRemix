import React, { useState, useEffect } from 'react';
import { Calendar, Shirt, Palette, Sparkles, CloudSun, Check, MapPin } from 'lucide-react';
import { EVENTS_DATA } from '../data/eventsData';
import { GARMENTS_DATA } from '../data/garmentsData';
import { COLOR_PALETTE } from '../data/colorsData';
import { ACCESSORIES_DATA } from '../data/accessoriesData';
import { STYLES_DATA } from '../data/stylesData';
import { HERITAGE_CITIES, fetchOpenMeteoWeather, weatherAdvice } from '../services/weather';

const REGION_FILTERS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'bac', label: 'Bắc Bộ' },
  { id: 'trung', label: 'Trung Bộ' },
  { id: 'nam', label: 'Nam Bộ' }
];

function matchesRegion(item, region) {
  if (!region || region === 'all') return true;
  if (!item.regions || item.regions.length === 0) return true;
  return item.regions.includes('toan-quoc') || item.regions.includes(region);
}

export function StudioControls({
  regionFilter = 'all',
  onRegionFilterChange,
  selectedStyleId = '',
  onSelectStyle,
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
  const [activeTab, setActiveTab] = useState('garment');
  const [cityId, setCityId] = useState('hanoi');
  const [weatherDate, setWeatherDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [liveWeather, setLiveWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  const currentEvent = EVENTS_DATA.find((e) => e.id === selectedEventId) || EVENTS_DATA[0];
  const currentGarment = GARMENTS_DATA.find((g) => g.id === selectedGarmentId) || GARMENTS_DATA[0];

  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => {
      if (!cancelled) setWeatherLoading(true);
    });
    fetchOpenMeteoWeather(cityId, weatherDate)
      .then((data) => {
        if (!cancelled) setLiveWeather(data);
      })
      .catch(() => {
        if (!cancelled) setLiveWeather(null);
      })
      .finally(() => {
        if (!cancelled) setWeatherLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [cityId, weatherDate]);

  const filteredEvents = EVENTS_DATA.filter((e) => matchesRegion(e, regionFilter));
  const filteredGarments = GARMENTS_DATA.filter((g) => matchesRegion(g, regionFilter));
  const filteredHead = ACCESSORIES_DATA.head.filter((a) => matchesRegion(a, regionFilter));
  const filteredHand = ACCESSORIES_DATA.hand.filter((a) => matchesRegion(a, regionFilter));
  const filteredFoot = ACCESSORIES_DATA.foot.filter((a) => matchesRegion(a, regionFilter));

  const advice = liveWeather ? weatherAdvice(liveWeather, currentGarment) : null;

  return (
    <div className="bg-white rounded-2xl border border-[#DECDB8] shadow-md overflow-hidden flex flex-col">
      {/* Region Filter Strip (Bắc - Trung - Nam) */}
      {onRegionFilterChange && (
        <div className="px-3 py-2 bg-[#F4EFE6] border-b border-[#E6DBCE] flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[11px] font-bold text-[#664422] flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#8B1A1A]" />
            Vùng miền:
          </span>
          <div className="flex items-center gap-1 flex-wrap">
            {REGION_FILTERS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => onRegionFilterChange(r.id)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                  regionFilter === r.id
                    ? 'bg-[#8B1A1A] text-white shadow-xs'
                    : 'bg-white text-[#664422] border border-[#DECDB8] hover:border-[#8B1A1A]/50'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tab Navigation Headers */}
      <div className="flex border-b border-[#E6DBCE] bg-[#FAF7F2] p-1.5 gap-1 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('event')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition shrink-0 ${
            activeTab === 'event' ? 'bg-[#8B1A1A] text-white shadow-sm' : 'text-[#664422] hover:bg-black/5'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>1. Sự Kiện</span>
        </button>

        <button
          onClick={() => setActiveTab('garment')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition shrink-0 ${
            activeTab === 'garment' ? 'bg-[#8B1A1A] text-white shadow-sm' : 'text-[#664422] hover:bg-black/5'
          }`}
        >
          <Shirt className="w-3.5 h-3.5" />
          <span>2. Cổ Phục</span>
        </button>

        <button
          onClick={() => setActiveTab('color')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition shrink-0 ${
            activeTab === 'color' ? 'bg-[#8B1A1A] text-white shadow-sm' : 'text-[#664422] hover:bg-black/5'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>3. Màu Sắc</span>
        </button>

        <button
          onClick={() => setActiveTab('accessories')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition shrink-0 ${
            activeTab === 'accessories' ? 'bg-[#8B1A1A] text-white shadow-sm' : 'text-[#664422] hover:bg-black/5'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>4. Phụ Kiện</span>
        </button>
      </div>

      {/* Tab 1: Event & Live Weather Context */}
      {activeTab === 'event' && (
        <div className="p-4 space-y-3">
          {/* Weather Callout + Open-Meteo Selector */}
          <div className="bg-[#FAF3DD]/80 rounded-xl p-3 border border-[#E8DFC8] space-y-2 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 font-bold text-[#664422]">
                <CloudSun className="w-4 h-4 text-[#C9A227]" />
                <span>
                  {liveWeather
                    ? `${liveWeather.cityName}: ${liveWeather.tempText} – ${liveWeather.desc}`
                    : `${currentEvent.weather.temp} – ${currentEvent.weather.desc}`}
                </span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white text-[#664422] border border-[#DECDB8]">
                {weatherLoading ? 'Đang tải...' : liveWeather ? 'Open-Meteo Live' : 'Gợi ý mặc định'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                aria-label="Chọn thành phố dự báo thời tiết"
                value={cityId}
                onChange={(e) => setCityId(e.target.value)}
                className="px-2 py-1 rounded-lg bg-white border border-[#DECDB8] text-[11px] font-medium text-[#1D2440]"
              >
                {HERITAGE_CITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                aria-label="Chọn ngày sự kiện"
                value={weatherDate}
                onChange={(e) => setWeatherDate(e.target.value)}
                className="px-2 py-1 rounded-lg bg-white border border-[#DECDB8] text-[11px] text-[#1D2440]"
              />
            </div>

            <p className="text-[11px] text-[#8C5E3B]">
              {advice ? `${advice.note} Chất liệu khuyên dùng: ${advice.fabric}.` : currentEvent.weather.advice}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
            {filteredEvents.map((event) => {
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
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-[#8B1A1A] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1.5 line-clamp-2">{event.etiquette}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Garment & Style Selection */}
      {activeTab === 'garment' && (
        <div className="p-4 space-y-3">
          {onSelectStyle && (
            <div className="bg-[#FAF7F2] rounded-xl p-2.5 border border-[#E6DBCE] space-y-1.5">
              <span className="text-[11px] font-bold text-[#664422] block">
                Phong cách phối (tùy chọn, +6đ Harmony):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {STYLES_DATA.map((st) => {
                  const active = selectedStyleId === st.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => onSelectStyle(active ? '' : st.id)}
                      title={st.description}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition border ${
                        active
                          ? 'bg-[#1D2440] text-white border-[#1D2440]'
                          : 'bg-white text-[#664422] border-[#DECDB8] hover:border-[#8B1A1A]'
                      }`}
                    >
                      {st.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {filteredGarments.map((garment) => {
              const isSelected = garment.id === selectedGarmentId;
              return (
                <button
                  key={garment.id}
                  onClick={() => onSelectGarment(garment.id)}
                  className={`w-full p-3.5 rounded-xl border text-left transition flex items-start gap-3 ${
                    isSelected
                      ? 'border-[#8B1A1A] bg-[#8B1A1A]/5 ring-1 ring-[#8B1A1A]'
                      : 'border-[#E6DBCE] hover:border-[#8B1A1A]/40 bg-white'
                  }`}
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="font-bold text-sm text-[#1D2440]">{garment.name}</h5>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFE8DC] text-[#664422] shrink-0">
                        {garment.era.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-snug">{garment.silhouette}</p>
                    <p className="text-[11px] text-[#8C5E3B] font-medium pt-0.5">💡 {garment.philosophy}</p>
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
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                1. Sắc áo chính (Outer Garment)
              </span>
              <span className="text-xs font-medium text-[#8B1A1A]">
                {COLOR_PALETTE.find((c) => c.id === selectedOuterColorId)?.name}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {COLOR_PALETTE.map((color) => {
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
                    {isSelected && <Check className={`w-4 h-4 ${color.textDark ? 'text-black' : 'text-white'}`} />}
                    <span className={`text-[9px] font-bold absolute bottom-0.5 ${color.textDark ? 'text-black/80' : 'text-white/80'}`}>
                      {color.element}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-[#E6DBCE]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                2. Màu Quần lụa / Chân váy
              </span>
              <span className="text-xs font-medium text-[#8B1A1A]">
                {COLOR_PALETTE.find((c) => c.id === selectedBottomColorId)?.name}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {COLOR_PALETTE.map((color) => {
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
                    {isSelected && <Check className={`w-3.5 h-3.5 ${color.textDark ? 'text-black' : 'text-white'}`} />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-[#E6DBCE]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                3. Thắt lưng / Khăn bao ngũ sắc
              </span>
              <span className="text-xs font-medium text-[#8B1A1A]">
                {COLOR_PALETTE.find((c) => c.id === selectedBeltColorId)?.name}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {COLOR_PALETTE.map((color) => {
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
                    {isSelected && <Check className={`w-3 h-3 ${color.textDark ? 'text-black' : 'text-white'}`} />}
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
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
              Mũ &amp; Phụ Kiện Đầu
            </span>
            <div className="grid grid-cols-2 gap-2">
              {filteredHead.map((item) => {
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

          <div className="pt-2 border-t border-[#E6DBCE]">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
              Phụ Kiện Cầm Tay
            </span>
            <div className="grid grid-cols-2 gap-2">
              {filteredHand.map((item) => {
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

          <div className="pt-2 border-t border-[#E6DBCE]">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
              Giày &amp; Guốc (Bắt trend Remix)
            </span>
            <div className="grid grid-cols-2 gap-2">
              {filteredFoot.map((item) => {
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
