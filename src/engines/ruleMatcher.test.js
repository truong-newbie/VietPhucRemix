import { describe, it, expect } from 'vitest';
import { matchRule, validateRules } from './ruleMatcher';
import { classifyCreativity } from './creativityClassifier';
import { CULTURE_RULES } from '../data/cultureRules';
import { GARMENTS_DATA } from '../data/garmentsData';
import { EVENTS_DATA } from '../data/eventsData';
import { COLOR_PALETTE } from '../data/colorsData';
import { ACCESSORIES_DATA } from '../data/accessoriesData';

const colorsMap = Object.fromEntries(COLOR_PALETTE.map((c) => [c.id, c]));
const accessoriesMap = {
  head: Object.fromEntries(ACCESSORIES_DATA.head.map((a) => [a.id, a])),
  hand: Object.fromEntries(ACCESSORIES_DATA.hand.map((a) => [a.id, a])),
  foot: Object.fromEntries(ACCESSORIES_DATA.foot.map((a) => [a.id, a]))
};

const baseState = {
  eventId: 'tet-xuan',
  garmentId: 'ngu-than',
  outerColorId: 'do-son',
  bottomColorId: 'trang-su',
  beltColorId: 'hoang-tho',
  headAccessoryId: 'khan-van',
  handAccessoryId: 'tui-tote',
  footAccessoryId: 'sneaker-trang',
  bottomLength: 'long',
  gender: 'female'
};

describe('ruleMatcher & 200+ CULTURE_RULES', () => {
  it('contains 7 garments and at least 200 declarative rules', () => {
    expect(GARMENTS_DATA.length).toBe(7);
    expect(CULTURE_RULES.length).toBeGreaterThanOrEqual(200);
  });

  it('passes validateRules across the entire rule set with 0 errors', () => {
    const errors = validateRules(CULTURE_RULES, {
      events: EVENTS_DATA,
      garments: GARMENTS_DATA,
      colors: COLOR_PALETTE,
      head: ACCESSORIES_DATA.head,
      hand: ACCESSORIES_DATA.hand,
      foot: ACCESSORIES_DATA.foot
    });
    expect(errors).toEqual([]);
  });

  it('ensures every rule with autoFix stops matching itself after autoFix is applied', () => {
    const mapAutoFixToState = (fix) => ({ ...fix });
    const failing = [];

    for (const rule of CULTURE_RULES) {
      if (!rule.autoFix || !rule.when) continue;
      const triggered = { ...baseState };
      for (const [k, vals] of Object.entries(rule.when)) {
        if (k === 'outerElement' || k === 'bottomElement' || k === 'beltElement') continue;
        triggered[k] = Array.isArray(vals) ? vals[0] : vals;
      }
      if (rule.when.outerElement) {
        const c = COLOR_PALETTE.find((x) => rule.when.outerElement.includes(x.element));
        if (c) triggered.outerColorId = c.id;
      }
      if (rule.when.bottomElement) {
        const c = COLOR_PALETTE.find((x) => rule.when.bottomElement.includes(x.element));
        if (c) triggered.bottomColorId = c.id;
      }

      if (!matchRule(rule, triggered, colorsMap)) continue;
      const fixed = { ...triggered, ...mapAutoFixToState(rule.autoFix) };
      if (matchRule(rule, fixed, colorsMap)) {
        failing.push(rule.id);
      }
    }

    expect(failing).toEqual([]);
  });

  it('classifies creativity into 3 levels accurately', () => {
    expect(
      classifyCreativity(
        { ...baseState, headAccessoryId: 'khan-van', handAccessoryId: 'quat-lua', footAccessoryId: 'guoc-moc' },
        { status: 'green' },
        accessoriesMap
      ).id
    ).toBe('truyen-thong');

    expect(
      classifyCreativity(baseState, { status: 'green' }, accessoriesMap).id
    ).toBe('cach-tan');

    expect(
      classifyCreativity(baseState, { status: 'red' }, accessoriesMap).id
    ).toBe('sang-tao-tu-do');
  });
});
