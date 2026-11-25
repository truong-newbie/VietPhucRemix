import { describe, it, expect } from 'vitest';
import { calculateHarmonyScore } from './harmonyEngine';
import { GARMENTS_DATA } from '../data/garmentsData';
import { EVENTS_DATA } from '../data/eventsData';
import { COLOR_PALETTE } from '../data/colorsData';
import { ACCESSORIES_DATA } from '../data/accessoriesData';

const findById = (arr, id) => arr.find((x) => x.id === id);

describe('harmonyEngine', () => {
  it('matches exact Gen Z Tet snapshot score (83)', () => {
    const res = calculateHarmonyScore({
      garment: findById(GARMENTS_DATA, 'ngu-than'),
      event: findById(EVENTS_DATA, 'tet-xuan'),
      outerColor: findById(COLOR_PALETTE, 'do-son'),
      bottomColor: findById(COLOR_PALETTE, 'trang-su'),
      beltColor: findById(COLOR_PALETTE, 'hoang-tho'),
      headAccessory: findById(ACCESSORIES_DATA.head, 'khan-van'),
      footAccessory: findById(ACCESSORIES_DATA.foot, 'sneaker-trang')
    });
    expect(res.score).toBe(83);
    expect(res.rating).toBe('Khá hài hòa');
  });

  it('rewards same-element and generating-element pairs, and mediates clash with belt', () => {
    const sameElement = calculateHarmonyScore({
      garment: findById(GARMENTS_DATA, 'ngu-than'),
      event: findById(EVENTS_DATA, 'cong-so-sang-tao'),
      outerColor: findById(COLOR_PALETTE, 'lam-cham'),
      bottomColor: findById(COLOR_PALETTE, 'den-tuyen'),
      beltColor: findById(COLOR_PALETTE, 'hoang-tho'),
      headAccessory: findById(ACCESSORIES_DATA.head, 'khong-mu')
    });
    expect(sameElement.score).toBeGreaterThanOrEqual(80);

    const mediated = calculateHarmonyScore({
      garment: findById(GARMENTS_DATA, 'ngu-than'),
      event: findById(EVENTS_DATA, 'cong-so-sang-tao'),
      outerColor: findById(COLOR_PALETTE, 'luc-bao'), // Mộc
      bottomColor: findById(COLOR_PALETTE, 'hoang-tho'), // Thổ (Mộc khắc Thổ)
      beltColor: findById(COLOR_PALETTE, 'do-son'), // Hỏa (Mộc sinh Hỏa)
      headAccessory: findById(ACCESSORIES_DATA.head, 'khong-mu')
    });

    const unmediated = calculateHarmonyScore({
      garment: findById(GARMENTS_DATA, 'ngu-than'),
      event: findById(EVENTS_DATA, 'cong-so-sang-tao'),
      outerColor: findById(COLOR_PALETTE, 'luc-bao'),
      bottomColor: findById(COLOR_PALETTE, 'hoang-tho'),
      beltColor: findById(COLOR_PALETTE, 'trang-su'), // Kim (không hòa giải)
      headAccessory: findById(ACCESSORIES_DATA.head, 'khong-mu')
    });

    expect(mediated.score).toBeGreaterThan(unmediated.score);
  });

  it('clamps score within [20, 99]', () => {
    const low = calculateHarmonyScore({
      garment: findById(GARMENTS_DATA, 'ao-ba-ba'),
      event: findById(EVENTS_DATA, 'dam-cuoi'),
      outerColor: findById(COLOR_PALETTE, 'den-tuyen'), // forbidden + Thủy
      bottomColor: findById(COLOR_PALETTE, 'do-son'), // Hỏa (clash)
      beltColor: findById(COLOR_PALETTE, 'den-tuyen'),
      headAccessory: findById(ACCESSORIES_DATA.head, 'non-quai-thao') // incompatible
    });
    expect(low.score).toBeGreaterThanOrEqual(20);
    expect(low.score).toBeLessThan(60);
  });
});
