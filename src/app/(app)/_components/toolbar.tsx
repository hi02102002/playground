'use client';

import {
  CornersOut,
  Images,
  Nut,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Sliders,
  SpeakerHigh,
  SpeakerX,
} from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { pick } from 'ramda';
import { Fragment, useMemo } from 'react';
import { useEventListener } from 'usehooks-ts';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useStore } from '@/store';

import { MixBtn } from './mix-btn';
import { ScenesBtn } from './scenes-btn';

const Toolbar = () => {
  const router = useRouter();
  const { isMuted, isPlaying, nextTrack, prevTrack, togglePlay, toggleMute, inActiveAllEffects } =
    useStore((state) =>
      pick(
        [
          'isPlaying',
          'isMuted',
          'nextTrack',
          'prevTrack',
          'togglePlay',
          'toggleMute',
          'inActiveAllEffects',
        ],
        state,
      ),
    );

  const buttons = useMemo(() => {
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
        icon: isMuted ? SpeakerX : SpeakerHigh,
        tooltip: isMuted ? 'Bật âm thanh' : 'Tắt âm thanh',
        onClick: () => {
          toggleMute();
        },
      },
      {
        separator: true,
      },
      {
        icon: Sliders,
        tooltip: 'Mix',
        render: () => {
          return <MixBtn />;
        },
      },
      {
        icon: Images,
        tooltip: 'Ảnh',
        render: () => {
          return <ScenesBtn />;
        },
      },
      {
        icon: Nut,
        tooltip: 'Cài đặt',
        onClick: () => {
          router.push('/login');
        },
      },
      {
        separator: true,
      },
      {
        icon: CornersOut,
        tooltip: 'Toàn màn hình',
      },
    ];
  }, [isMuted, isPlaying, inActiveAllEffects, nextTrack, prevTrack, toggleMute, togglePlay]);

  const handleKeydown = (e: KeyboardEvent) => {
    console.log(e.code);
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
          if ('separator' in button) {
            return <Separator orientation="vertical" className="bg-[#fff2]" key={index} />;
          }

          if ('render' in button && button.render) {
            return <Fragment key={index}>{button.render()}</Fragment>;
          }

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
                    <button.icon />
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
