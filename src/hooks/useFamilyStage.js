import { useState, useCallback } from 'react';
import { DEFAULT_OUTFIT } from './useOutfit';

// Khung quản lý sân khấu Cá nhân (1 người) vs Gia đình (2-4 thành viên)
export const FAMILY_ROLE_TEMPLATES = [
  {
    role: 'mother',
    label: 'Mẹ',
    gender: 'female',
    defaults: {
      garmentId: 'nhat-binh',
      outerColorId: 'do-son',
      bottomColorId: 'trang-su',
      beltColorId: 'hoang-tho',
      headId: 'tram-cai-sen',
      handId: 'quat-lua',
      footId: 'guoc-moc'
    }
  },
  {
    role: 'father',
    label: 'Bố',
    gender: 'male',
    defaults: {
      garmentId: 'ngu-than',
      outerColorId: 'lam-cham',
      bottomColorId: 'trang-su',
      beltColorId: 'hoang-tho',
      headId: 'khan-van',
      handId: 'quat-lua',
      footId: 'guoc-moc'
    }
  },
  {
    role: 'daughter',
    label: 'Con gái',
    gender: 'female',
    defaults: {
      garmentId: 'ao-dai',
      outerColorId: 'hong-dao',
      bottomColorId: 'trang-su',
      beltColorId: 'hoang-tho',
      headId: 'khan-van',
      handId: 'tui-tote',
      footId: 'giay-bup-be'
    }
  },
  {
    role: 'son',
    label: 'Con trai',
    gender: 'male',
    defaults: {
      garmentId: 'ngu-than',
      outerColorId: 'hoang-tho',
      bottomColorId: 'trang-su',
      beltColorId: 'do-son',
      headId: 'khong-mu',
      handId: 'khong-cam-tay',
      footId: 'sneaker-trang'
    }
  }
];

export function useFamilyStage(primaryOutfit) {
  const [groupMode, setGroupMode] = useState('single'); // 'single' | 'family'
  const [activeMemberIndex, setActiveMemberIndex] = useState(0);
  const [familyMembers, setFamilyMembers] = useState(() =>
    FAMILY_ROLE_TEMPLATES.slice(0, 2).map((tpl) => ({
      role: tpl.role,
      label: tpl.label,
      outfit: {
        ...DEFAULT_OUTFIT,
        gender: tpl.gender,
        ...tpl.defaults
      }
    }))
  );

  const toggleGroupMode = useCallback(
    (nextMode) => {
      setGroupMode(nextMode);
      if (nextMode === 'family' && primaryOutfit) {
        setFamilyMembers((prev) =>
          prev.map((m, idx) =>
            idx === 0
              ? { ...m, outfit: { ...primaryOutfit } }
              : { ...m, outfit: { ...m.outfit, eventId: primaryOutfit.eventId } }
          )
        );
        setActiveMemberIndex(0);
      }
    },
    [primaryOutfit]
  );

  const updateMemberOutfit = useCallback((index, patch) => {
    setFamilyMembers((prev) =>
      prev.map((m, i) => (i === index ? { ...m, outfit: { ...m.outfit, ...patch } } : m))
    );
  }, []);

  const addFamilyMember = useCallback(() => {
    setFamilyMembers((prev) => {
      if (prev.length >= 4) return prev;
      const nextTpl =
        FAMILY_ROLE_TEMPLATES.find((t) => !prev.some((m) => m.role === t.role)) ||
        FAMILY_ROLE_TEMPLATES[prev.length];
      return [
        ...prev,
        {
          role: nextTpl.role,
          label: nextTpl.label,
          outfit: {
            ...DEFAULT_OUTFIT,
            eventId: primaryOutfit?.eventId || DEFAULT_OUTFIT.eventId,
            gender: nextTpl.gender,
            ...nextTpl.defaults
          }
        }
      ];
    });
  }, [primaryOutfit?.eventId]);

  const removeFamilyMember = useCallback((index) => {
    setFamilyMembers((prev) => {
      if (prev.length <= 2) return prev;
      return prev.filter((_, i) => i !== index);
    });
    setActiveMemberIndex((curr) => Math.max(0, curr - 1));
  }, []);

  return {
    groupMode,
    setGroupMode: toggleGroupMode,
    familyMembers,
    activeMemberIndex,
    setActiveMemberIndex,
    updateMemberOutfit,
    addFamilyMember,
    removeFamilyMember
  };
}
