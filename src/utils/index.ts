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
