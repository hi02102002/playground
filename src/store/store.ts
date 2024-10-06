import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';

import { createEffectsSlice, effectsInitialState } from './slices/effects.slice';
import { createPlayerSlice, playerInitialState } from './slices/player.slice';
import { createSceneSlice, sceneInitialState } from './slices/scene.slice';
import { AppState, Store } from './type';

const defaultState: AppState = {
  ...sceneInitialState,
  ...effectsInitialState,
  ...playerInitialState,
};

export const initStore = (): AppState => {
  return defaultState;
};

const resetSet = new Set<() => void>();

export const createAppStore = (initState: AppState = defaultState) => {
  const store = createStore<Store>()(
    devtools(
      persist(
        immer((set, get, store) => ({
          ...initState,
          ...createSceneSlice(set, get, store),
          ...createEffectsSlice(set, get, store),
          ...createPlayerSlice(set, get, store),
        })),
        {
          name: 'app-store',
          storage: createJSONStorage(() => localStorage),
          partialize: (state) => ({
            ...state,
            isPlaying: false,
          }),
        },
      ),
    ),
  );

  const reset = () =>
    store.setState((state) => ({
      ...state,
      isPlaying: false,
      effects: state.effects.map((effect) => ({
        ...effect,
        isActive: false,
      })),
    }));

  resetSet.add(reset);

  return store;
};

export const resetStores = () => {
  resetSet.forEach((reset) => reset());
};
