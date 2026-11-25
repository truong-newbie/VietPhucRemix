import { describe, it, expect } from 'vitest';
import { resolveSlotColor, getFabricMaterialProps } from './materialMapper3d';

describe('materialMapper3d', () => {
  const colors = {
    outerHex: '#8B1A1A',
    bottomHex: '#212124',
    beltHex: '#C9A227',
    innerHex: '#F5F5F0'
  };

  it('maps 4 canonical material slot names case-insensitively', () => {
    expect(resolveSlotColor('Mat_Outer', colors)).toBe('#8B1A1A');
    expect(resolveSlotColor('mat_bottom_silk', colors)).toBe('#212124');
    expect(resolveSlotColor('Mat_Belt', colors)).toBe('#C9A227');
    expect(resolveSlotColor('MAT_TRIM', colors)).toBe('#F5F5F0');
  });

  it('returns null for unrecognized material names (e.g. skin/hair)', () => {
    expect(resolveSlotColor('Skin_Face', colors)).toBeNull();
  });

  it('returns valid fabric roughness/metalness presets with safe fallback', () => {
    expect(getFabricMaterialProps('gam').metalness).toBeGreaterThan(0.2);
    expect(getFabricMaterialProps('unknown').id).toBe('lua');
  });
});
