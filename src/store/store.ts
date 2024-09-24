import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';

import { createEffectsSlice, effectsInitialState } from './slices/effects.slice';
import { createSceneSlice, sceneInitialState } from './slices/scene.slice';
import { AppState, Store } from './type';

const defaultState: AppState = {
  ...sceneInitialState,
  ...effectsInitialState,
};

export const initStore = (): AppState => {
  return defaultState;
};

export const createAppStore = (initState: AppState = defaultState) => {
  return createStore<Store>()(
    devtools(
      persist(
        immer((set, get, store) => ({
          ...initState,
          ...createSceneSlice(set, get, store),
          ...createEffectsSlice(set, get, store),
        })),
        {
          name: 'app-store',
          getStorage: () => ({
            setItem: (...args) => window.localStorage.setItem(...args),
            removeItem: (...args) => window.localStorage.removeItem(...args),
            getItem: async (...args) =>
              new Promise((resolve) => {
                if (typeof window === 'undefined') {
                  resolve(null);
                } else {
                  setTimeout(() => {
                    resolve(window.localStorage.getItem(...args));
                  }, 0);
                }
              }),
          }),
        },
      ),
    ),
  );
};
