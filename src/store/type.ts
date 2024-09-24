import { EffectsSlice, EffectsState } from './slices/effects.slice';
import { SceneSlice, SceneState } from './slices/scene.slice';

export type AppState = SceneState & EffectsState;
export type Store = SceneSlice & EffectsSlice;
