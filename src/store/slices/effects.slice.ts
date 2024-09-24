import { StateCreator } from 'zustand';

import { EffectType, SoundEffect, effectsMap, scenes } from '@/data/sets';

import { Store } from '../type';

export type EffectWithVolume = SoundEffect & {
  volume: number;
  isActive: boolean;
};

export type EffectsState = {
  effects: Array<EffectWithVolume>;
};

export type EffectsActions = {
  addEffect: (effect: EffectWithVolume) => void;
  removeEffect: (effect: EffectWithVolume) => void;
  setEffectVolume: (effect: EffectWithVolume, volume: number) => void;
  setEffects: (keys: Array<EffectType>) => void;
};

export type EffectsSlice = EffectsState & EffectsActions;

export const effectsInitialState: EffectsState = {
  effects: scenes.forestInside.actions
    .map((action) => {
      if ('effect' in action) {
        return {
          ...effectsMap[action.effect],
          volume: 1,
          isActive: false,
        };
      }

      return {
        isActive: false,
        name: '',
        type: 'pink_noise',
        url: '',
        volume: 1,
      } as EffectWithVolume;
    })
    .filter((effect) => effect.name),
};

export const createEffectsSlice: StateCreator<Store, [], [], EffectsSlice> = (set) => ({
  ...effectsInitialState,
  addEffect: (effect: EffectWithVolume) => {
    set((state) => ({
      ...state,
      effects: [
        ...state.effects,
        {
          ...effect,
          volume: 1,
          isActive: true,
        },
      ],
    }));
  },
  removeEffect: (effect: EffectWithVolume) => {
    set((state) => ({
      ...state,
      effects: state.effects.filter((e) => e.type !== effect.type),
    }));
  },
  setEffectVolume: (effect: EffectWithVolume, volume: number) => {
    set((state) => ({
      ...state,
      effects: state.effects.map((e) => (e.type === effect.type ? { ...e, volume } : e)),
    }));
  },
  setEffects: (keys: Array<EffectType>) => {
    set((state) => {
      return {
        ...state,
        effects: keys.map((key) => {
          return {
            ...effectsMap[key],
            volume: 0,
            isActive: false,
          };
        }),
      };
    });
  },
});
