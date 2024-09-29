import { StateCreator } from 'zustand';

import { effectsMap, scenes } from '@/data/sets';
import { EffectType, SoundEffect } from '@/data/type';

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
  setEffectVolume: (effect: SoundEffect, volume: number) => void;
  setEffects: (keys: Array<EffectType>) => void;
  toggleEffect: (type: EffectType) => void;
  inActiveAllEffects: () => void;
};

export type EffectsSlice = EffectsState & EffectsActions;

export const effectsInitialState: EffectsState = {
  effects: scenes.forestInside.actions
    .map((action) => {
      if ('effect' in action) {
        return {
          ...effectsMap[action.effect],
          volume: 0.5,
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

export const createEffectsSlice: StateCreator<Store, [], [], EffectsSlice> = (set) => {
  return {
    ...effectsInitialState,
    addEffect: (effect: EffectWithVolume) => {
      set((state) => ({
        ...state,
        effects: [
          ...state.effects,
          {
            ...effect,
            volume: 0.5,
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
    setEffectVolume: (effect: SoundEffect, volume: number) => {
      set((state) => {
        const existingEffect = state.effects.find((e) => e.type === effect.type);

        if (!existingEffect) {
          return {
            ...state,
            effects: [
              ...state.effects,
              {
                ...effect,
                volume,
                isActive: volume > 0,
              },
            ],
          };
        }

        return {
          ...state,
          effects: state.effects.map((e) => {
            if (e.type === effect.type) {
              return {
                ...e,
                volume,
                isActive: volume > 0,
              };
            }

            return e;
          }),
        };
      });
    },
    setEffects: (keys: Array<EffectType>) => {
      set((state) => {
        return {
          ...state,
          effects: keys.map((key) => {
            return {
              ...effectsMap[key],
              volume: 0.5,
              isActive: false,
            };
          }),
        };
      });
    },
    reset: () => {
      set({
        ...effectsInitialState,
        effects: effectsInitialState.effects.map((effect) => ({ ...effect, isActive: false })),
      });
    },
    toggleEffect(type) {
      set((state) => {
        return {
          ...state,
          effects: state.effects.map((e) => {
            if (e.type === type) {
              return {
                ...e,
                isActive: !e.isActive,
                volume: e.volume > 0 ? e.volume : 0.5,
              };
            }

            return e;
          }),
        };
      });
    },
    inActiveAllEffects: () => {
      set((state) => {
        return {
          ...state,
          effects: state.effects.map((e) => ({ ...e, isActive: false })),
        };
      });
    },
  };
};
