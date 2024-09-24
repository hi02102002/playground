import { StateCreator } from 'zustand';

import { Scene, scenes } from '@/data/sets';

import { Store } from '../type';

export type SceneState = {
  currentScene: Scene;
};

export type SceneActions = {
  setCurrentScene: (scene: Scene) => void;
};

export type SceneSlice = SceneState & SceneActions;

export const sceneInitialState: SceneState = {
  currentScene: scenes.forestInside,
};

export const createSceneSlice: StateCreator<Store, [], [], SceneSlice> = (set) => ({
  ...sceneInitialState,
  setCurrentScene: (scene: Scene) => {
    set((state) => ({
      ...state,
      currentScene: scene,
    }));
  },
});
