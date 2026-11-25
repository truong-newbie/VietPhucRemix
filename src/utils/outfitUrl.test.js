import { describe, it, expect } from 'vitest';
import { encodeOutfit, decodeOutfit } from './outfitUrl';

describe('outfitUrl', () => {
  it('encodes and decodes valid outfit parameters round-trip', () => {
    const sample = {
      eventId: 'tet-xuan',
      garmentId: 'ngu-than',
      outerColorId: 'do-son',
      bottomColorId: 'trang-su',
      beltColorId: 'hoang-tho',
      headId: 'khan-van',
      handId: 'tui-tote',
      footId: 'sneaker-trang',
      bottomLength: 'long',
      mode: 'genz',
      gender: 'female'
    };

    const qs = encodeOutfit(sample);
    expect(qs.startsWith('?')).toBe(true);
    expect(decodeOutfit(qs)).toEqual(sample);
  });

  it('ignores unknown/invalid query values safely', () => {
    const decoded = decodeOutfit('?e=invalid-event&g=ngu-than&o=fake-color&l=short&s=male');
    expect(decoded).toEqual({
      garmentId: 'ngu-than',
      bottomLength: 'short',
      gender: 'male'
    });
  });

  it('returns empty object for empty search string', () => {
    expect(decodeOutfit('')).toEqual({});
  });
});
