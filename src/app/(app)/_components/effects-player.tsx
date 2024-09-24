'use client';

import ReactPlayer from 'react-player';

import { useStore } from '@/store';

export const EffectsPlayer = () => {
  const { effects } = useStore((state) => ({
    effects: state.effects,
  }));

  return (
    <div className="hidden">
      {effects.map((effect) => {
        return (
          <ReactPlayer
            key={effect.type}
            url={effect.url}
            playing={effect.volume > 0}
            volume={effect.volume}
            loop={true}
            width="0"
            height="0"
          />
        );
      })}
    </div>
  );
};
