'use client';

import { pick } from 'ramda';
import ReactPlayer from 'react-player';

import { playlistsBase } from '@/data/sets';
import { useStore } from '@/store';

export const TrackPlayer = () => {
  const { currentTrackId, playlistMod, isMuted, isPlaying, volume, nextTrack, setIsPlaying } =
    useStore((state) =>
      pick(
        [
          'currentTrackId',
          'playlistMod',
          'isMuted',
          'isPlaying',
          'volume',
          'nextTrack',
          'setIsPlaying',
        ],
        state,
      ),
    );

  const currentTract = playlistsBase[playlistMod][currentTrackId];

  if (!currentTract) return null;

  return (
    <div className="hidden">
      <ReactPlayer
        url={currentTract}
        playing={isPlaying}
        volume={isMuted ? 0 : volume}
        onEnded={() => {
          nextTrack();
        }}
      />
    </div>
  );
};
