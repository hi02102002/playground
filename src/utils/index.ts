import { Scene } from '@/data/sets';
import { env } from '@/env.mjs';

export const absoluteUrl = (path: string) => {
  return new URL(path, env.NEXT_PUBLIC_APP_URL).href;
};

export const getAvatar = (nameOrEmail: string): string => {
  return `https://ui-avatars.com/api/?background=random&name=${nameOrEmail}`;
};

export function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin;
  if (env.NEXT_PUBLIC_APP_URL.startsWith('localhost')) return `http://${env.NEXT_PUBLIC_APP_URL}`;
  return `https://${env.NEXT_PUBLIC_APP_URL}`;
}

export const hasSupportDarkOrPixel = (
  variants: Scene['variants'],
  darkOrPixel: 'dark' | 'pixel',
) => {
  return Object.keys(variants).some((key) => key.includes(darkOrPixel));
};

export const getVideoUtubeUrl = (videoId: string) => {
  return `https://www.youtube.com/watch?v=${videoId}`;
};

export const getUtubeVideoId = (url: string) => {
  if (!url) return null;

  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url?.match(regex);
  return match ? match[1] : null;
};
