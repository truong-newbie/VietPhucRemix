import { GARMENTS_DATA } from '../data/garmentsData';
import { EVENTS_DATA } from '../data/eventsData';
import { COLOR_PALETTE } from '../data/colorsData';
import { ACCESSORIES_DATA } from '../data/accessoriesData';

const DEFAULT_VALID_IDS = {
  events: EVENTS_DATA.map((e) => e.id),
  garments: GARMENTS_DATA.map((g) => g.id),
  colors: COLOR_PALETTE.map((c) => c.id),
  head: ACCESSORIES_DATA.head.map((a) => a.id),
  hand: ACCESSORIES_DATA.hand.map((a) => a.id),
  foot: ACCESSORIES_DATA.foot.map((a) => a.id),
  bottomLengths: ['long', 'short'],
  modes: ['genz', 'family'],
  genders: ['female', 'male']
};

/**
 * Encode outfit configuration into a query string
 * @param {Object} outfit 
 * @returns {string} e.g. "?e=tet-xuan&g=ngu-than..."
 */
export function encodeOutfit(outfit = {}) {
  const params = new URLSearchParams();

  if (outfit.eventId) params.set('e', outfit.eventId);
  if (outfit.garmentId) params.set('g', outfit.garmentId);
  if (outfit.outerColorId) params.set('o', outfit.outerColorId);
  if (outfit.bottomColorId) params.set('b', outfit.bottomColorId);
  if (outfit.beltColorId) params.set('t', outfit.beltColorId);
  if (outfit.headId) params.set('h', outfit.headId);
  if (outfit.handId) params.set('hd', outfit.handId);
  if (outfit.footId) params.set('f', outfit.footId);
  if (outfit.bottomLength) params.set('l', outfit.bottomLength);
  if (outfit.mode) params.set('m', outfit.mode);
  if (outfit.gender) params.set('s', outfit.gender);

  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

/**
 * Decode query string into partial outfit state, safely ignoring invalid IDs
 * @param {string} search window.location.search
 * @param {Object} validIds optional map of valid ID lists
 * @returns {Object} Partial outfit configuration
 */
export function decodeOutfit(search, validIds = DEFAULT_VALID_IDS) {
  const result = {};
  if (!search) return result;

  const rawSearch = search.startsWith('?') ? search.slice(1) : search;
  const params = new URLSearchParams(rawSearch);

  const check = (key, paramName, validList) => {
    const val = params.get(paramName);
    if (!val) return;
    if (validList && Array.isArray(validList)) {
      if (validList.includes(val)) {
        result[key] = val;
      }
    } else {
      result[key] = val;
    }
  };

  check('eventId', 'e', validIds.events);
  check('garmentId', 'g', validIds.garments);
  check('outerColorId', 'o', validIds.colors);
  check('bottomColorId', 'b', validIds.colors);
  check('beltColorId', 't', validIds.colors);
  check('headId', 'h', validIds.head);
  check('handId', 'hd', validIds.hand);
  check('footId', 'f', validIds.foot);
  check('bottomLength', 'l', validIds.bottomLengths || ['long', 'short']);
  check('mode', 'm', validIds.modes || ['genz', 'family']);
  check('gender', 's', validIds.genders || ['female', 'male']);

  return result;
}
