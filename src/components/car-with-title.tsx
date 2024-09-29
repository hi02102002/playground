import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  title: string | ReactNode | (() => JSX.Element);
  headerClassName?: string;
  leftIcon?: ReactNode;
  className?: string;
  children: ReactNode;
};

export const CarWithTitle = ({ title, className, leftIcon, children, headerClassName }: Props) => {
  const _title = typeof title === 'function' ? title() : title;

  return (
    <div className={cn('bg-blur bg-white/10 backdrop-blur-lg rounded-sm p-3', className)}>
      <div className={cn('flex items-center justify-between gap-2 mb-2', headerClassName)}>
        <span className="font-semibold">{_title}</span>
        {leftIcon}
      </div>
      <div>{children}</div>
    </div>
  );
};
