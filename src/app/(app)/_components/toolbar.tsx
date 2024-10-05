'use client';

import {
  CornersOut,
  Icon,
  Images,
  Nut,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  SpeakerHigh,
  SpeakerX,
  YoutubeLogo,
} from '@phosphor-icons/react';
import { pick } from 'ramda';
import { Fragment, useMemo } from 'react';
import { useEventListener } from 'usehooks-ts';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useStore } from '@/store';

import { MixBtn } from './mix-btn';
import { PlaylistBtn } from './playlist-btn';
import { ScenesBtn } from './scenes-btn';

const Toolbar = () => {
  const {
    isMuted,
    isPlaying,
    nextTrack,
    prevTrack,
    togglePlay,
    toggleMute,
    isShuffling,
    toggleShuffle,
  } = useStore((state) =>
    pick(
      [
        'isPlaying',
        'isMuted',
        'nextTrack',
        'prevTrack',
        'togglePlay',
        'toggleMute',
        'inActiveAllEffects',
        'isShuffling',
        'toggleShuffle',
      ],
      state,
    ),
  );

  const buttons: Array<{
    icon?: Icon;
    tooltip?: string;
    onClick?: () => void;
    render?: () => JSX.Element;
    separator?: boolean;
  }> = useMemo(() => {
    return [
      {
        icon: SkipBack,
        tooltip: 'Bài trước',
        onClick: prevTrack,
      },
      {
        icon: isPlaying ? Pause : Play,
        tooltip: isPlaying ? 'Tạm dừng' : 'Phát',
        onClick: togglePlay,
      },
      {
        icon: SkipForward,
        tooltip: 'Bài tiếp theo',
        onClick: nextTrack,
      },
      {
        icon: isShuffling ? Repeat : Shuffle,
        tooltip: isShuffling ? 'Tắt phát ngẫu nhiên' : 'Phát ngẫu nhiên',
        onClick: toggleShuffle,
      },
      {
        icon: isMuted ? SpeakerX : SpeakerHigh,
        tooltip: isMuted ? 'Bật âm thanh' : 'Tắt âm thanh',
        onClick: toggleMute,
      },
      {
        separator: true,
      },
      {
        render: () => {
          return <MixBtn />;
        },
      },
      {
        render: () => {
          return <PlaylistBtn />;
        },
      },
      {
        icon: Images,
        render: () => {
          return <ScenesBtn />;
        },
      },
      {
        icon: YoutubeLogo,
        tooltip: 'Youtube Music',
      },
      {
        icon: Nut,
        tooltip: 'Cài đặt',
      },
      {
        separator: true,
      },
      {
        icon: CornersOut,
        tooltip: 'Toàn màn hình',
      },
    ];
  }, [
    prevTrack,
    isPlaying,
    togglePlay,
    nextTrack,
    isMuted,
    toggleMute,
    isShuffling,
    toggleShuffle,
  ]);

  const handleKeydown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    const isTypingElement =
      target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

    if (isTypingElement) return;

    if (e.code === 'Space') {
      e.preventDefault();
      togglePlay();
    }

    if (e.code === 'ArrowRight') {
      e.preventDefault();
      nextTrack();
    }

    if (e.code === 'ArrowLeft') {
      e.preventDefault();
      prevTrack();
    }

    if (e.code === 'KeyM') {
      toggleMute();
    }
  };

  useEventListener('keydown', handleKeydown);

  return (
    <div className="fixed z-[100] bottom-4 w-full px-4 flex items-center justify-center">
      <div className="backdrop-blur-sm bg-black/60 rounded-md h-11 flex items-center justify-center gap-3 px-4 py-3 w-full">
        {buttons.map((button, index) => {
          const Icon = button.icon;

          if ('separator' in button) {
            return <Separator orientation="vertical" className="bg-[#fff2]" key={index} />;
          }

          if ('render' in button && button.render) {
            return <Fragment key={index}>{button.render()}</Fragment>;
          }

          if (!Icon) return null;

          return (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="blur"
                    size="icon-sm"
                    className="[&>svg]:size-5"
                    onClick={'onClick' in button ? button.onClick : undefined}
                  >
                    <Icon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  className="backdrop-blur-sm bg-black/60 text-primary"
                  sideOffset={10}
                >
                  <p>{button.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
};

export default Toolbar;
