'use client';

import { pick } from 'ramda';
import ReactPlayer from 'react-player';

import { useStore } from '@/store';

export const TrackPlayer = () => {
  const { currentTrackId, isMuted, isPlaying, volume, nextTrack, playlist, playlistMod } = useStore(
    (state) =>
      pick(
        [
          'currentTrackId',
          'playlistMod',
          'isMuted',
          'isPlaying',
          'volume',
          'nextTrack',
          'setIsPlaying',
          'playlist',
        ],
        state,
      ),
  );

  const currentTract = playlist[currentTrackId];

  if (!currentTract) return null;

  return (
    <div className="hidden">
      <ReactPlayer
        url={currentTract}
        playing={isPlaying}
        volume={isMuted ? 0 : volume}
        loop={playlistMod !== 'utube'}
        onEnded={() => {
          if (playlistMod === 'utube') {
            nextTrack();
          }
        }}
      />
    </div>
  );
};
