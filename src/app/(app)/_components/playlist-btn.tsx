'use client';

import { Playlist } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const PlaylistBtn = () => {
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
          className="relative bg-blur p-3 gap-3 w-96 flex flex-col select-none"
        ></PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};
