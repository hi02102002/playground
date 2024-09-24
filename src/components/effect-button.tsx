import { cn } from '@/lib/utils';

type Props = {
  title: string;
  isActivated?: boolean;
  onActivate?: () => void;
};

const EffectButton = ({ title, isActivated, onActivate }: Props) => {
  return (
    <div className="flex items-center justify-center flex-col cursor-pointer" onClick={onActivate}>
      <div className="cursor-pointer border-[3px] rounded-full border-white size-8 group flex items-center justify-center">
        <div
          className={cn(
            'bg-white rounded-full size-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all',
            {
              'opacity-100 visible': isActivated,
            },
          )}
        />
      </div>
      <span>{title}</span>
    </div>
  );
};

export default EffectButton;
