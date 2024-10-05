import { StaticImageData } from 'next/image';

export type EffectType =
  | 'fire'
  | 'forest'
  | 'rain_forest'
  | 'waves'
  | 'fan'
  | 'city'
  | 'storm'
  | 'rain_street'
  | 'river'
  | 'birds'
  | 'people'
  | 'wind'
  | 'ocean'
  | 'fireplace'
  | 'snow'
  | 'keyboard'
  | 'underwater'
  | 'space'
  | 'window_rain'
  | 'train_noise'
  | 'thunders'
  | 'white_noise'
  | 'pink_noise'
  | 'brown_noise'
  | 'plane'
  | 'rain_window';

export interface SoundEffect {
  type: EffectType;
  name: string;
  url: string;
}

export type SoundTrackMood = 'chill' | 'jazzy' | 'sleepy' | 'utube';

export interface Scene {
  thumbnail: string | StaticImageData;
  wallpaper: string;
  variants: { [key in string]: string };
  actions: ({
    position: [number, number];
    title: string;
  } & (
    | {
        type: 'sound';
        effect: EffectType;
      }
    | {
        type: 'next-set';
      }
  ))[];
}

export interface SceneSet {
  _id: string;
  thumbnail: string | StaticImageData;
  name: string;
  scenes: Scene[];
  effects: EffectType[];
  premium?: boolean;
}
