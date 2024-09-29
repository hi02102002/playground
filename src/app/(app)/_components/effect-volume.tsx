'use client';

import { pick } from 'ramda';

import { Slider } from '@/components/ui/slider';
import { SoundEffect } from '@/data/type';
import { useStore } from '@/store';

type Props = {
  effect: SoundEffect;
};

export const EffectVolume = ({ effect }: Props) => {
  const { effects, setEffectVolume } = useStore((state) =>
    pick(['setEffectVolume', 'effects'], state),
  );

  const currentEffect = effects.find((e) => e.type === effect.type);

  return (
    <div className="flex items-center gap-2">
      <span className="inline-block w-full max-w-28">{effect.name}</span>
      <Slider
        rangeClassName="bg-yellow-500"
        thumbClassName="bg-yellow-600 border-none cursor-pointer shadow"
        defaultValue={[currentEffect?.volume || 0]}
        onValueCommit={(value) => {
          const [volume] = value;
          setEffectVolume(effect, volume);
        }}
        step={0.1}
        min={0}
        max={1}
      />
    </div>
  );
};
