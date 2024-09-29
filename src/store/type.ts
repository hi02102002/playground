import { EffectsSlice, EffectsState } from './slices/effects.slice';
import { PlayerSlice, PlayerState } from './slices/player.slice';
import { SceneSlice, SceneState } from './slices/scene.slice';

export type AppState = SceneState & EffectsState & PlayerState;
export type Store = SceneSlice & EffectsSlice & PlayerSlice;
