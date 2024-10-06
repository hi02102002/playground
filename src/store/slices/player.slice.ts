import { omit } from 'ramda';
import { StateCreator } from 'zustand';

import { playlistsBase } from '@/data/sets';
import { SoundTrackMood } from '@/data/type';
import { UTUBE } from '@/data/utube';
import { getVideoUtubeUrl } from '@/utils';

import { Store } from '../type';

type SoundTrackMoodWithUtube = SoundTrackMood | 'utube';

export type PlayerState = {
  isMuted: boolean;
  volume: number;
  isPlaying: boolean;
  histories: Array<number>;
  playlistMod: SoundTrackMoodWithUtube;
  currentTrackId: number;
  playlist: string[];
  utubePlaylist: {
    [key: string]: {
      name: string;
      artist: string;
      thumbnail: string;
    };
  };
  source: 'lofi' | 'utube-music';
  isShuffling: boolean;
};

export type PlayerActions = {
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setPlaylistMod: (mod: SoundTrackMoodWithUtube) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  reset: () => void;
  addTrack: (track: string, shouldPlay?: boolean) => void;
  removeTrack: (track: string) => void;
  addUtubeTrack: ({
    name,
    artist,
    videoId,
    thumbnail,
  }: {
    name: string;
    artist: string;
    videoId: string;
    thumbnail: string;
  }) => void;
  setSource: (source: 'lofi' | 'utube-music') => void;
  toggleShuffle: () => void;
  playTrack: (track: string) => void;
  pauseTrack: (track: string) => void;
};

const findSuitableTrack = (
  histories: number[],
  currentTrackId: number, // index of current track
  tracks: string[] = [],
  isShuffling: boolean = false,
) => {
  if (!tracks.length) return -1;

  const trackIndices = tracks.map((_, index) => index);

  const availableTracks = trackIndices.filter((index) => !histories.includes(index));

  if (!availableTracks.length) {
    return Math.floor(Math.random() * tracks.length);
  }

  if (isShuffling) {
    return availableTracks[Math.floor(Math.random() * availableTracks.length)];
  }

  const nextTrackId = availableTracks.find((index) => index > currentTrackId);

  return nextTrackId ?? availableTracks[0];
};

export type PlayerSlice = PlayerState & PlayerActions;

export const playerInitialState: PlayerState = {
  isMuted: false,
  volume: 1,
  isPlaying: false,
  currentTrackId: 0,
  histories: [],
  playlistMod: 'chill',
  playlist: playlistsBase.chill,
  utubePlaylist: UTUBE.reduce(
    (acc, song) => {
      acc[song.videoId] = {
        name: song.name,
        artist: song.artist.name || 'Không rõ',
        thumbnail: song.thumbnails[0].url,
      };
      return acc;
    },
    {} as PlayerState['utubePlaylist'],
  ),
  source: 'lofi',
  isShuffling: false,
};

const MAX_HISTORY_LENGTH = 5;

export const createPlayerSlice: StateCreator<Store, [], [], PlayerSlice> = (set) => {
  return {
    ...playerInitialState,
    setSource: (source: 'lofi' | 'utube-music') => {
      set((state) => ({
        ...state,
        source,
        histories: [],
      }));
    },
    toggleShuffle: () => {
      set((state) => ({ ...state, isShuffling: !state.isShuffling }));
    },
    toggleMute: () => {
      set((state) => ({ ...state, isMuted: !state.isMuted }));
    },
    setVolume: (volume: number) => {
      set((state) => ({ ...state, volume }));
    },
    togglePlay: () => {
      set((state) => ({ ...state, isPlaying: !state.isPlaying }));
    },
    setPlaylistMod: (mod: SoundTrackMoodWithUtube) => {
      set((state) => {
        return {
          ...state,
          playlistMod: mod,
          currentTrackId: 0,
          playlist: playlistsBase[mod],
          histories: [],
        };
      });
    },
    nextTrack: () => {
      set((state) => {
        const nextTrackId = findSuitableTrack(
          state.histories,
          state.currentTrackId,
          state.playlist,
          state.isShuffling,
        );

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
          currentTrackId: lastTrackId ?? 0,
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
    addTrack(track: string, shouldPlay = false) {
      set((state) => {
        if (state.playlist.includes(track)) {
          return {
            ...state,
            currentTrackId: state.playlist.indexOf(track),
            isPlaying: shouldPlay || state.isPlaying,
          };
        }

        return {
          ...state,
          playlist: [...state.playlist, track],
          currentTrackId: shouldPlay ? state.playlist.length : state.currentTrackId,
          isPlaying: shouldPlay || state.isPlaying,
        };
      });
    },
    removeTrack(videoId: string) {
      set((state) => {
        return {
          ...state,
          playlist: state.playlist.filter((t) => t !== getVideoUtubeUrl(videoId)),
          utubePlaylist: omit([videoId], state.utubePlaylist),
        };
      });
    },
    addUtubeTrack({ name, artist, videoId, thumbnail }) {
      set((state) => {
        if (state.playlistMod !== 'utube') {
          return state;
        }

        if (state.utubePlaylist[videoId]) {
          return state;
        }

        return {
          ...state,
          utubePlaylist: {
            ...state.utubePlaylist,
            [videoId]: { name, artist, thumbnail },
          },
        };
      });
    },
    playTrack(track: string) {
      set((state) => {
        return {
          ...state,
          currentTrackId: state.playlist.indexOf(track),
          isPlaying: true,
        };
      });
    },
    pauseTrack(track: string) {
      set((state) => {
        return {
          ...state,
          currentTrackId: state.playlist.indexOf(track),
          isPlaying: false,
        };
      });
    },
  };
};
