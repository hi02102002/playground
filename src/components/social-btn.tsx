'use client';

import { CircleNotch, GithubLogo, GoogleLogo } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import { useRouter } from '@/hooks';
import { cn } from '@/lib/utils';

const MAP_SOCIAL = {
  google: {
    icon: GoogleLogo,
    text: 'Google',
    href: '/api/auth/google/login',
  },
  github: {
    icon: GithubLogo,
    text: 'GitHub',
    href: '/api/auth/github/login',
  },
};

type Props = {
  provider: keyof typeof MAP_SOCIAL;
};

export const SocialBtn = ({ provider }: Props) => {
  const { icon, text, href } = MAP_SOCIAL[provider];
  const { isLoading, push } = useRouter();

  const Icon = isLoading ? CircleNotch : icon;

  return (
    <Button variant="outline" className="w-full" onClick={() => push(href)} disabled={isLoading}>
      <Icon
        className={cn('w-5 h-5 mr-2', {
          'animate-spin': isLoading,
        })}
      />
      <span>Tiếp tục với {text}</span>
    </Button>
  );
};
