'use client';

import { ArrowBendDownLeft, Images } from '@phosphor-icons/react';
import Image from 'next/image';
import { title } from 'process';
import React, { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SceneSet, sets } from '@/data/sets';
import { useStore } from '@/store';

export const ScenesBtn = () => {
  const [currentSet, setCurrentSet] = React.useState<SceneSet | null>(null);
  const [api, setApi] = React.useState<CarouselApi>();
  const [open, setOpen] = React.useState(false);

  const { setCurrentScene, setEffects } = useStore((state) => {
    return {
      ...state,
    };
  });

  useEffect(() => {
    if (!api) return;

    api.reInit({
      dragFree: true,
      watchDrag: currentSet ? false : true,
    });
  }, [api, currentSet]);

  return (
    <TooltipProvider>
      <Popover modal open={open} onOpenChange={setOpen}>
        <Tooltip>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant="blur" size="icon-sm" className="[&>svg]:size-5">
                <Images />
              </Button>
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent className="bg-blur text-primary" sideOffset={10}>
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent
          side="top"
          sideOffset={10}
          className="relative bg-blur -left-4 flex gap-4"
          style={{
            width: 'calc(100vw - 32px)',
          }}
        >
          {currentSet && (
            <Button
              onClick={() => {
                setCurrentSet(null);
              }}
              variant="blur"
              size="icon-sm"
              className="self-center"
            >
              <ArrowBendDownLeft className="w-5 h-5" />
              <span className="sr-only">Quay lại</span>
            </Button>
          )}
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {currentSet
                ? currentSet.scenes.map((scene, index) => {
                    return (
                      <CarouselItem key={index} className="basis-1/5">
                        <div
                          className="flex items-center justify-center rounded-md relative aspect-[360/200] cursor-pointer overflow-hidden"
                          onClick={() => {
                            setCurrentScene(scene);
                            setEffects(currentSet.effects);
                            setOpen(false);
                            setCurrentSet(null);
                          }}
                        >
                          <Image
                            src={scene.thumbnail}
                            alt={
                              typeof scene.thumbnail === 'string'
                                ? scene.thumbnail
                                : scene.thumbnail.src
                            }
                            fill
                            className="w-full h-full object-cover"
                            placeholder="blur"
                            blurDataURL={
                              typeof scene.thumbnail === 'string'
                                ? scene.thumbnail
                                : scene.thumbnail.src
                            }
                          />
                        </div>
                      </CarouselItem>
                    );
                  })
                : sets.map((set) => {
                    return (
                      <CarouselItem key={set._id} className="basis-1/5">
                        <div
                          className="flex items-center justify-center rounded-md relative aspect-[360/200] cursor-pointer"
                          onClick={() => {
                            setCurrentSet(set);
                          }}
                        >
                          <Image
                            src={set.thumbnail}
                            alt={set.name}
                            fill
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    );
                  })}
            </CarouselContent>
          </Carousel>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};
