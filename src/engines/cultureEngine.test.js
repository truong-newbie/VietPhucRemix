import { describe, it, expect } from 'vitest';
import { evaluateCultureGuard } from './cultureEngine';
import { COLOR_PALETTE } from '../data/colorsData';
import { SCENARIOS_DATA } from '../data/scenariosData';

const colorsMap = Object.fromEntries(COLOR_PALETTE.map((c) => [c.id, c]));

function makeState(overrides = {}) {
  return {
    eventId: 'tet-xuan',
    garmentId: 'ngu-than',
    outerColorId: 'do-son',
    bottomColorId: 'trang-su',
    beltColorId: 'hoang-tho',
    headAccessoryId: 'khan-van',
    handAccessoryId: 'tui-tote',
    footAccessoryId: 'sneaker-trang',
    bottomLength: 'long',
    ...overrides
  };
}

describe('cultureEngine', () => {
  it('triggers red rules for temple short/red, wedding black, and cross-region mismatch', () => {
    expect(evaluateCultureGuard(makeState({ eventId: 'le-chua', bottomLength: 'short' }), colorsMap).status).toBe('red');
    expect(evaluateCultureGuard(makeState({ eventId: 'le-chua', outerColorId: 'do-son' }), colorsMap).status).toBe('red');
    expect(evaluateCultureGuard(makeState({ eventId: 'dam-cuoi', outerColorId: 'den-tuyen' }), colorsMap).status).toBe('red');
    expect(evaluateCultureGuard(makeState({ garmentId: 'ao-ba-ba', headAccessoryId: 'non-quai-thao' }), colorsMap).status).toBe('red');
  });

  it('triggers yellow rules for Thủy-Hỏa clash and Nhật Bình + sneaker', () => {
    expect(
      evaluateCultureGuard(
        makeState({
          eventId: 'cong-so-sang-tao',
          garmentId: 'ao-dai',
          outerColorId: 'lam-cham',
          bottomColorId: 'do-son',
          beltColorId: 'lam-cham',
          footAccessoryId: 'giay-bup-be'
        }),
        colorsMap
      ).status
    ).toBe('yellow');

    expect(
      evaluateCultureGuard(
        makeState({
          eventId: 'dam-cuoi',
          garmentId: 'nhat-binh',
          outerColorId: 'hoang-tho',
          bottomColorId: 'trang-su',
          footAccessoryId: 'sneaker-trang'
        }),
        colorsMap
      ).status
    ).toBe('yellow');
  });

  it('triggers green rules and falls back to default-safe when no rule matches', () => {
    const greenNhatBinh = evaluateCultureGuard(
      makeState({ eventId: 'dam-cuoi', garmentId: 'nhat-binh', outerColorId: 'hoang-tho', footAccessoryId: 'guoc-moc' }),
      colorsMap
    );
    expect(greenNhatBinh.status).toBe('green');

    const safeDefault = evaluateCultureGuard(
      makeState({
        eventId: 'cong-so-sang-tao',
        garmentId: 'ao-dai',
        outerColorId: 'luc-bao',
        bottomColorId: 'trang-su',
        headAccessoryId: 'khong-mu',
        footAccessoryId: 'giay-bup-be'
      }),
      colorsMap
    );
    expect(safeDefault.status).toBe('green');
    expect(safeDefault.activeRule.id).toBe('default-safe');
  });

  it('prioritizes red > yellow > green when multiple rules match', () => {
    const res = evaluateCultureGuard(
      makeState({
        eventId: 'le-chua',
        garmentId: 'nhat-binh',
        outerColorId: 'do-son',
        bottomLength: 'short',
        footAccessoryId: 'sneaker-trang'
      }),
      colorsMap
    );
    expect(res.status).toBe('red');
    expect(res.allMatched.length).toBeGreaterThanOrEqual(2);
  });

  it('evaluates the 4 demo scenarios with expected traffic-light statuses', () => {
    const toState = (s) =>
      makeState({
        ...s,
        headAccessoryId: s.headId,
        handAccessoryId: s.handId,
        footAccessoryId: s.footId
      });

    expect(evaluateCultureGuard(toState(SCENARIOS_DATA['genz-tet'].outfit), colorsMap).status).toBe('green');
    expect(evaluateCultureGuard(toState(SCENARIOS_DATA['temple-violation'].outfit), colorsMap).status).toBe('red');
    expect(evaluateCultureGuard(toState(SCENARIOS_DATA['royal-wedding'].outfit), colorsMap).status).toBe('green');
    expect(evaluateCultureGuard(toState(SCENARIOS_DATA['quan-ho-heritage'].outfit), colorsMap).status).toBe('green');
  });
});
