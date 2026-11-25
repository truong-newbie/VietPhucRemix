import { useReducer, useMemo, useEffect, useCallback } from 'react';
import { GARMENTS_DATA } from '../data/garmentsData';
import { EVENTS_DATA } from '../data/eventsData';
import { COLOR_PALETTE } from '../data/colorsData';
import { ACCESSORIES_DATA } from '../data/accessoriesData';
import { STYLES_DATA } from '../data/stylesData';
import { evaluateCultureGuard } from '../engines/cultureEngine';
import { calculateHarmonyScore } from '../engines/harmonyEngine';
import { encodeOutfit, decodeOutfit } from '../utils/outfitUrl';
import { loadJson, saveJson } from '../utils/storage';

export const OUTFIT_STORAGE_KEY = 'vpr_last_outfit';

export const DEFAULT_OUTFIT = {
  mode: 'genz',
  gender: 'female',
  eventId: 'tet-xuan',
  garmentId: 'ngu-than',
  outerColorId: 'do-son',
  bottomColorId: 'trang-su',
  beltColorId: 'hoang-tho',
  headId: 'khan-van',
  handId: 'tui-tote',
  footId: 'sneaker-trang',
  bottomLength: 'long',
  styleId: ''
};

function outfitReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'APPLY_PARTIAL':
      return { ...state, ...action.payload };
    case 'RESET':
      return { ...DEFAULT_OUTFIT, ...action.payload };
    default:
      return state;
  }
}

function getInitialOutfit() {
  const saved = loadJson(OUTFIT_STORAGE_KEY, {});
  const urlOverrides =
    typeof window !== 'undefined' ? decodeOutfit(window.location.search) : {};
  return {
    ...DEFAULT_OUTFIT,
    ...(saved && typeof saved === 'object' ? saved : {}),
    ...urlOverrides
  };
}

export function useOutfit() {
  const [outfit, dispatch] = useReducer(outfitReducer, undefined, getInitialOutfit);

  const colorsMap = useMemo(() => {
    const map = {};
    COLOR_PALETTE.forEach((c) => {
      map[c.id] = c;
    });
    return map;
  }, []);

  const setField = useCallback((field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  }, []);

  const applyPartial = useCallback((payload) => {
    if (payload && typeof payload === 'object') {
      dispatch({ type: 'APPLY_PARTIAL', payload });
    }
  }, []);

  const resetOutfit = useCallback((overrides = {}) => {
    dispatch({ type: 'RESET', payload: overrides });
  }, []);

  // Đồng bộ URL & localStorage mỗi khi bộ phối thay đổi
  useEffect(() => {
    saveJson(OUTFIT_STORAGE_KEY, outfit);
    if (typeof window === 'undefined') return;
    const qs = encodeOutfit(outfit);
    const newUrl = `${window.location.pathname}${qs}${window.location.hash}`;
    window.history.replaceState(null, '', newUrl);
  }, [outfit]);

  const getShareUrl = useCallback(() => {
    if (typeof window === 'undefined') return '';
    const qs = encodeOutfit(outfit);
    return `${window.location.origin}${window.location.pathname}${qs}`;
  }, [outfit]);

  // Các object suy ra từ ID
  const selectedGarment = useMemo(
    () => GARMENTS_DATA.find((g) => g.id === outfit.garmentId) || GARMENTS_DATA[0],
    [outfit.garmentId]
  );

  const selectedEvent = useMemo(
    () => EVENTS_DATA.find((e) => e.id === outfit.eventId) || EVENTS_DATA[0],
    [outfit.eventId]
  );

  const outerColor = colorsMap[outfit.outerColorId] || COLOR_PALETTE[0];
  const bottomColor = colorsMap[outfit.bottomColorId] || COLOR_PALETTE[4];
  const innerColor = colorsMap['trang-su'];
  const beltColor = colorsMap[outfit.beltColorId] || COLOR_PALETTE[1];

  const headAccessory = useMemo(
    () => ACCESSORIES_DATA.head.find((a) => a.id === outfit.headId),
    [outfit.headId]
  );

  const handAccessory = useMemo(
    () => ACCESSORIES_DATA.hand.find((a) => a.id === outfit.handId),
    [outfit.handId]
  );

  const footAccessory = useMemo(
    () => ACCESSORIES_DATA.foot.find((a) => a.id === outfit.footId),
    [outfit.footId]
  );

  const selectedStyle = useMemo(
    () => STYLES_DATA.find((s) => s.id === outfit.styleId) || null,
    [outfit.styleId]
  );

  // Dữ liệu truyền cho Culture Guard Engine
  const cultureState = useMemo(
    () => ({
      eventId: outfit.eventId,
      garmentId: outfit.garmentId,
      outerColorId: outfit.outerColorId,
      bottomColorId: outfit.bottomColorId,
      beltColorId: outfit.beltColorId,
      headAccessoryId: outfit.headId,
      handAccessoryId: outfit.handId,
      footAccessoryId: outfit.footId,
      bottomLength: outfit.bottomLength,
      gender: outfit.gender
    }),
    [outfit]
  );

  const cultureResult = useMemo(
    () => evaluateCultureGuard(cultureState, colorsMap),
    [cultureState, colorsMap]
  );

  const harmonyResult = useMemo(
    () =>
      calculateHarmonyScore({
        garment: selectedGarment,
        event: selectedEvent,
        outerColor,
        bottomColor,
        beltColor,
        headAccessory,
        handAccessory,
        footAccessory,
        style: selectedStyle
      }),
    [selectedGarment, selectedEvent, outerColor, bottomColor, beltColor, headAccessory, handAccessory, footAccessory, selectedStyle]
  );

  return {
    outfit,
    setField,
    applyPartial,
    resetOutfit,
    getShareUrl,
    colorsMap,
    selectedGarment,
    selectedEvent,
    selectedStyle,
    outerColor,
    innerColor,
    bottomColor,
    beltColor,
    headAccessory,
    handAccessory,
    footAccessory,
    cultureState,
    cultureResult,
    harmonyResult
  };
}
