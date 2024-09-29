import { StateCreator } from 'zustand';

import { playlistsBase } from '@/data/sets';
import { SoundTrackMood } from '@/data/type';

import { Store } from '../type';

export type PlayerState = {
  isMuted: boolean;
  volume: number;
  isPlaying: boolean;
  histories: Array<number>;
  playlistMod: SoundTrackMood;
  currentTrackId: number;
};

export type PlayerActions = {
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setPlaylistMod: (mod: SoundTrackMood) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  reset: () => void;
};

const findSuitableTrack = (mood: SoundTrackMood, histories: number[]) => {
  const tracks = playlistsBase[mood];

  if (!tracks.length) return -1;

  const trackIndices = tracks.map((_, index) => index);

  const availableTracks = trackIndices.filter((index) => !histories.includes(index));

  if (!availableTracks.length) {
    return Math.floor(Math.random() * tracks.length);
  }

  const randomIndex = Math.floor(Math.random() * availableTracks.length);
  return availableTracks[randomIndex];
};

export type PlayerSlice = PlayerState & PlayerActions;

export const playerInitialState: PlayerState = {
  isMuted: false,
  volume: 1,
  isPlaying: false,
  currentTrackId: 0,
  histories: [],
  playlistMod: 'chill',
};

const MAX_HISTORY_LENGTH = 5;

export const createPlayerSlice: StateCreator<Store, [], [], PlayerSlice> = (set) => {
  return {
    ...playerInitialState,
    toggleMute: () => {
      set((state) => ({ ...state, isMuted: !state.isMuted }));
    },
    setVolume: (volume: number) => {
      set((state) => ({ ...state, volume }));
    },
    togglePlay: () => {
      set((state) => ({ ...state, isPlaying: !state.isPlaying }));
    },
    setPlaylistMod: (mod: SoundTrackMood) => {
      set((state) => {
        return {
          ...state,
          playlistMod: mod,
          currentTrackId:
            state.currentTrackId !== -1
              ? findSuitableTrack(mod, state.histories)
              : state.currentTrackId,
        };
      });
    },
    nextTrack: () => {
      set((state) => {
        const nextTrackId = findSuitableTrack(state.playlistMod, state.histories);

        return {
          ...state,
          currentTrackId: nextTrackId,
          histories: [...state.histories, nextTrackId].slice(-MAX_HISTORY_LENGTH),
          isPlaying: true,
        };
      });
    },
    prevTrack: () => {
      set((state) => {
        const lastTrackId = state.histories[state.histories.length - 1];

        const histories = state.histories.slice(0, -1);

        return {
          ...state,
          histories,
          currentTrackId: lastTrackId ?? findSuitableTrack(state.playlistMod, histories),
          isPlaying: true,
        };
      });
    },
    setIsPlaying(isPlaying) {
      set((state) => ({
        ...state,
        isPlaying,
      }));
    },
    reset() {
      set({
        ...playerInitialState,
        isPlaying: false,
      });
    },
  };
};
