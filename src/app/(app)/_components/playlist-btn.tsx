'use client';

import { Playlist } from '@phosphor-icons/react';
import { pick } from 'ramda';

import { CarWithTitle } from '@/components/car-with-title';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useStore } from '@/store';
import { getUtubeVideoId } from '@/utils';

import { PlaylistItem } from './playlist-item';
import { UtubeSong } from './utube';

export const PlaylistBtn = () => {
  const { playlist, playlistMod, utubePlaylist, currentTrackId, isPlaying, pauseTrack, playTrack } =
    useStore((state) =>
      pick(
        [
          'playlist',
          'utubePlaylist',
          'playlistMod',
          'currentTrackId',
          'isPlaying',
          'pauseTrack',
          'playTrack',
        ],
        state,
      ),
    );

  const currentTrack = playlist[currentTrackId];

  const renderCurrentTrack = () => {
    if (playlistMod === 'utube') {
      const videoId = getUtubeVideoId(currentTrack);
      if (videoId) {
        const song = utubePlaylist[videoId];
        return (
          <UtubeSong
            song={{
              ...song,
              videoId,
            }}
          />
        );
      }
    }

    return (
      <PlaylistItem
        name={playlistMod === 'utube' ? 'Không rõ' : `${playlistMod} - ${currentTrackId + 1}`}
        artist="Lofi"
        isPlaying={isPlaying}
        onPlay={() => {
          playTrack(currentTrack);
        }}
        onPaused={() => {
          pauseTrack(currentTrack);
        }}
      />
    );
  };

  return (
    <TooltipProvider>
      <Popover modal>
        <Tooltip>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant="blur" size="icon-sm" className="[&>svg]:size-5">
                <Playlist />
              </Button>
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent className="bg-blur text-primary" sideOffset={10}>
            Danh sách phát
          </TooltipContent>
        </Tooltip>
        <PopoverContent
          side="top"
          sideOffset={10}
          className="relative bg-blur p-3 gap-3 w-96 flex flex-col select-none "
        >
          <CarWithTitle title="Đang phát">
            <>{renderCurrentTrack()}</>
          </CarWithTitle>
          <CarWithTitle title="Danh sách phát">
            <div className="h-96 overflow-y-auto no-scrollbar flex flex-col gap-3">
              {playlist.map((track, index) => {
                const videoId = getUtubeVideoId(track);
                if (videoId) {
                  const song = utubePlaylist[videoId];
                  return (
                    <UtubeSong
                      key={videoId}
                      song={{
                        ...song,
                        videoId,
                      }}
                    />
                  );
                }

                return (
                  <PlaylistItem
                    key={track}
                    name={`${playlistMod} - ${index + 1}`}
                    artist="Lofi"
                    isPlaying={currentTrackId === index && isPlaying}
                    onPlay={() => {
                      playTrack(track);
                    }}
                    onPaused={() => {
                      pauseTrack(track);
                    }}
                  />
                );
              })}
            </div>
          </CarWithTitle>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};
