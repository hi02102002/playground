'use client';

import {
  CornersOut,
  Images,
  Nut,
  Pause,
  SkipBack,
  SkipForward,
  Sliders,
  SpeakerHigh,
  SpeakerX,
} from '@phosphor-icons/react';
import { Fragment, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { ScenesBtn } from './scenes-btn';

type Props = {};

const Toolbar = (props: Props) => {
  const buttons = useMemo(() => {
    return [
      {
        icon: SkipBack,
        tooltip: 'Bài trước',
      },
      {
        icon: Pause,
        tooltip: 'Dừng',
      },
      {
        icon: SkipForward,
        tooltip: 'Bài tiếp theo',
      },
      {
        icon: SpeakerHigh,
        tooltip: 'Tăng âm lượng',
      },
      {
        icon: SpeakerX,
        tooltip: 'Tắt âm',
      },
      {
        separator: true,
      },
      {
        icon: Sliders,
        tooltip: 'Mix',
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
      },
      {
        separator: true,
      },
      {
        icon: CornersOut,
        tooltip: 'Toàn màn hình',
      },
    ];
  }, []);

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
                  <Button variant="blur" size="icon-sm" className="[&>svg]:size-5">
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
