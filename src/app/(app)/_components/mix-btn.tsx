'use client';

import {
  Coffee,
  Equalizer,
  Icon,
  MoonStars,
  Sliders,
  Smiley,
  SpeakerHigh,
  SpeakerX,
  VinylRecord,
  Waveform,
  YoutubeLogo,
} from '@phosphor-icons/react';
import { pick } from 'ramda';

import { CarWithTitle } from '@/components/car-with-title';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { effects } from '@/data/sets';
import { SoundTrackMood } from '@/data/type';
import { cn } from '@/lib/utils';
import { useStore } from '@/store';

import { EffectVolume } from './effect-volume';
import { UtubeInputSearch, UtubeSearchResult } from './utube';

const MAP_ICONS: Record<SoundTrackMood, Icon> = {
  sleepy: MoonStars,
  jazzy: Smiley,
  chill: Coffee,
  utube: YoutubeLogo,
};

export const MixBtn = () => {
  const { playlistMod, setPlaylistMod, setVolume, volume, setSource, source } = useStore((state) =>
    pick(['playlistMod', 'setPlaylistMod', 'setVolume', 'volume', 'source', 'setSource'], state),
  );

  return (
    <TooltipProvider>
      <Popover modal>
        <Tooltip>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant="blur" size="icon-sm" className="[&>svg]:size-5">
                <Sliders />
              </Button>
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent className="bg-blur text-primary" sideOffset={10}>
            <p>Mix</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent
          side="top"
          sideOffset={10}
          className="relative bg-blur p-3 gap-3 w-96 flex flex-col select-none"
        >
          <CarWithTitle title="Âm nhạc" leftIcon={<Waveform className="size-6" />}>
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3 w-full">
                <button
                  className={cn(
                    'bg-white/40 w-full flex items-center justify-center rounded-md transition-all h-9 text-xs hover:bg-white/30 font-semibold gap-2 border-transparent',
                    { 'border-yellow-500 border-2 text-yellow-500': source === 'lofi' },
                  )}
                  onClick={() => {
                    setSource('lofi');
                  }}
                >
                  <VinylRecord weight="fill" size={24} />
                  Lofi
                </button>
                <button
                  className={cn(
                    'bg-white/40 w-full flex items-center justify-center rounded-md transition-all h-9 text-xs hover:bg-white/30 font-semibold gap-2 border-transparent',
                    { 'border-yellow-500 border-2 text-yellow-500': source === 'utube-music' },
                  )}
                  onClick={() => {
                    setSource('utube-music');
                  }}
                >
                  <YoutubeLogo weight="fill" size={24} />
                  Tube Music
                </button>
              </div>
              {source === 'utube-music' ? (
                <UtubeInputSearch />
              ) : (
                <div className="grid grid-cols-4 items-center gap-3 w-full">
                  {Object.keys(MAP_ICONS).map((key) => {
                    const Icon = MAP_ICONS[key as SoundTrackMood];

                    const isActive = playlistMod === key;

                    return (
                      <div key={key} className="flex flex-col items-center gap-1">
                        <button
                          key={key}
                          className={cn(
                            'bg-white/40 size-11 flex items-center justify-center rounded-full transition-all hover:bg-white/30',
                            {
                              'text-yellow-500 bg-white/20': isActive,
                            },
                          )}
                          onClick={() => setPlaylistMod(key as SoundTrackMood)}
                        >
                          <Icon className="size-6" weight="fill" />
                        </button>
                        <span
                          className={cn('capitalize text-xs', {
                            'text-yellow-500': isActive,
                          })}
                        >
                          {key}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </CarWithTitle>
          <CarWithTitle title="Âm lượng" leftIcon={<Equalizer className="size-6" />}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setVolume(0);
                }}
              >
                <SpeakerX className="size-6" weight="fill" />
              </button>
              <Slider
                rangeClassName="bg-yellow-500"
                thumbClassName="bg-yellow-600 border-none cursor-pointer shadow"
                defaultValue={[volume]}
                onValueCommit={(value) => {
                  const [volume] = value;
                  setVolume(volume);
                }}
                max={1}
                min={0}
                step={0.1}
              />
              <button
                onClick={() => {
                  setVolume(1);
                }}
              >
                <SpeakerHigh className="size-6" weight="fill" />
              </button>
            </div>
          </CarWithTitle>
          {source === 'utube-music' ? (
            <CarWithTitle title="Kết quả tìm kiếm" className="p-0" headerClassName="p-3 pb-0">
              <ScrollArea className="h-48 p-3">
                <UtubeSearchResult />
                <ScrollBar scrollAreaScrollbarClassName="bg-white/20" />
              </ScrollArea>
            </CarWithTitle>
          ) : (
            <CarWithTitle title="Hiệu ứng" className="p-0" headerClassName="p-3 pb-0">
              <ScrollArea className="h-48 p-3">
                <div className="flex flex-col gap-2">
                  {effects.map((effect) => {
                    return <EffectVolume effect={effect} key={effect.type} />;
                  })}
                </div>
                <ScrollBar scrollAreaScrollbarClassName="bg-white/20" />
              </ScrollArea>
            </CarWithTitle>
          )}
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};
