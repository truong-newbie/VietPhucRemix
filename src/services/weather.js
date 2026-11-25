// Dịch vụ Thời tiết thực tế Open-Meteo (miễn phí, không cần API key) & hàm thuần weatherAdvice

export const HERITAGE_CITIES = [
  { id: 'hanoi', name: 'Hà Nội', lat: 21.0285, lon: 105.8542 },
  { id: 'hue', name: 'Huế', lat: 16.4637, lon: 107.5909 },
  { id: 'danang', name: 'Đà Nẵng', lat: 16.0544, lon: 108.2022 },
  { id: 'hoian', name: 'Hội An', lat: 15.8801, lon: 108.338 },
  { id: 'hcm', name: 'TP. Hồ Chí Minh', lat: 10.8231, lon: 106.6297 },
  { id: 'cantho', name: 'Cần Thơ', lat: 10.0452, lon: 105.7469 }
];

const WEATHER_CACHE_PREFIX = 'vpr_weather_';

export function weatherAdvice(forecast, garment) {
  const temp = Number(forecast?.tempMax ?? forecast?.temp ?? 24);
  const precip = Number(forecast?.precipitationProb ?? 0);
  const garmentName = garment?.name || 'Việt phục';

  let fabric = 'Lụa tơ tằm hoặc gấm mỏng thoáng khí';
  const accessories = [];
  let note = `Thời tiết ôn hòa (~${Math.round(temp)}°C), rất thuận lợi để mặc ${garmentName}.`;

  if (temp < 19) {
    fabric = 'Gấm dày, lụa tơ tằm lót lớp trong giữ ấm';
    accessories.push('Khăn Vấn', 'Áo khoác Ngũ Thân');
    note = `Trời se lạnh (${Math.round(temp)}°C): nên chọn vải gấm dày và quấn thêm khăn vấn giữ ấm cổ.`;
  } else if (temp > 30) {
    fabric = 'Vải đũi, lụa tơ tằm hoặc lanh mỏng thấm hút mồ hôi';
    accessories.push('Quạt Lụa', 'Nón Lá Sen');
    note = `Trời nắng nóng (${Math.round(temp)}°C): ưu tiên chất liệu đũi/lụa mát và mang quạt lụa hoặc nón lá che nắng.`;
  }

  if (precip >= 45) {
    accessories.push('Guốc Mộc / Dép Cói (tránh giày vải)');
    note += ` Khả năng mưa ${precip}%: nên tránh giày sneaker vải trắng dễ lấm bẩn, ưu tiên guốc mộc hoặc dép cói.`;
  }

  return { fabric, accessories, note };
}

export async function fetchOpenMeteoWeather(cityId, dateStr) {
  const city = HERITAGE_CITIES.find((c) => c.id === cityId) || HERITAGE_CITIES[0];
  const targetDate = dateStr || new Date().toISOString().slice(0, 10);
  const cacheKey = `${WEATHER_CACHE_PREFIX}${city.id}_${targetDate}`;

  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const cached = window.sessionStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.fetchedAt < 30 * 60 * 1000) {
          return parsed.data;
        }
      }
    } catch {
      // ignore storage read error
    }
  }

  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), 4000) : null;

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FBangkok&start_date=${targetDate}&end_date=${targetDate}`;
    const resp = await fetch(url, controller ? { signal: controller.signal } : undefined);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const json = await resp.json();

    const tempMax = json?.daily?.temperature_2m_max?.[0];
    const tempMin = json?.daily?.temperature_2m_min?.[0];
    const precip = json?.daily?.precipitation_probability_max?.[0] ?? 0;

    if (typeof tempMax !== 'number') throw new Error('Invalid forecast payload');

    const data = {
      source: 'open-meteo',
      cityName: city.name,
      date: targetDate,
      tempMax,
      tempMin: typeof tempMin === 'number' ? tempMin : tempMax - 4,
      tempText: `${Math.round(tempMax)}°C`,
      precipitationProb: precip,
      desc:
        precip >= 50
          ? `Có khả năng mưa (${precip}%), ${Math.round(tempMin ?? tempMax - 4)}–${Math.round(tempMax)}°C`
          : tempMax > 30
          ? `Nắng ấm phương Nam, ${Math.round(tempMax)}°C`
          : tempMax < 19
          ? `Trời se lạnh, ${Math.round(tempMax)}°C`
          : `Thời tiết đẹp, ${Math.round(tempMax)}°C`
    };

    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        window.sessionStorage.setItem(cacheKey, JSON.stringify({ fetchedAt: Date.now(), data }));
      } catch {
        // ignore quota
      }
    }

    return data;
  } finally {
    if (timer) clearTimeout(timer);
  }
}
