'use client';

import { useMemo } from 'react';
import ReactPlayer from 'react-player';

import EffectButton from '@/components/effect-button';
import { EffectType } from '@/data/type';
import { cn } from '@/lib/utils';
import { useStore } from '@/store';

import { EffectsPlayer } from './effects-player';
import { TrackPlayer } from './track-player';

export const ActiveScene = () => {
  const { currentScene, effects, setEffectVolume } = useStore((state) => ({
    currentScene: state.currentScene,
    effects: state.effects,
    setEffectVolume: state.setEffectVolume,
  }));

  const currentVariant = useMemo(() => {
    let variant = 'default';

    const activeEffects = effects.filter((effect) => effect.isActive);

    for (let lookVariant of Object.keys(currentScene.variants)) {
      for (let effect of activeEffects) {
        if (effect.type === lookVariant) {
          variant = effect.type;
          break;
        }
      }
    }

    // if (hasSupportDarkOrPixel(currentScene.variants, 'dark') && theme === 'dark') {
    //   variant = `${variant}_night`;
    // }

    // if (hasSupportDarkOrPixel(currentScene.variants, 'pixel') && true) {
    //   variant = `${variant}_pixel`;
    // }

    return variant;
  }, [currentScene.variants, effects]);

  const isEffectActive = (type: EffectType) => {
    return effects.find((effect) => effect.type === type)?.isActive;
  };

  const handleToggleEffect = (type: EffectType) => {
    const effect = effects.find((effect) => effect.type === type);

    if (!effect) return;

    setEffectVolume(effect, effect.volume === 0 ? 0.5 : 0);
  };

  return (
    <>
      <div className="h-svh w-full relative">
        {Object.entries(currentScene.variants).map(([key, value]) => {
          return (
            <div
              key={key}
              className={cn(
                'opacity-0 invisible absolute inset-0 w-full h-full transition-all z-[5]',
                {
                  'opacity-100 visible': key === currentVariant,
                },
              )}
            >
              <ReactPlayer
                url={value}
                autoPlay
                loop
                muted
                playsInline
                className="[&>video]:w-full [&>video]:h-full [&>video]:object-cover"
                width="100%"
                height="100%"
                playing
              />
            </div>
          );
        })}
        {currentScene.actions.map((action) => {
          if (!('effect' in action)) return null;

          const [x, y] = action.position;

          return (
            <div
              key={action.title}
              className="absolute z-10"
              style={{
                top: `${y}%`,
                left: `${x}%`,
              }}
            >
              <EffectButton
                title={action.title}
                isActivated={isEffectActive(action.effect)}
                onActivate={() => handleToggleEffect(action.effect)}
              />
            </div>
          );
        })}
      </div>
      <EffectsPlayer />
      <TrackPlayer />
    </>
  );
};

export default ActiveScene;
