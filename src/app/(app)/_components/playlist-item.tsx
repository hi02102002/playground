import { PauseIcon, PlayIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const PlaylistItem = ({
  name,
  artist = 'Lofi',
  isPlaying,
  onPlay,
  onPaused,
}: {
  name: string;
  artist: string;
  isPlaying?: boolean;
  onPlay?: () => void;
  onPaused?: () => void;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="size-10 relative rounded-md overflow-hidden cursor-pointer group flex-shrink-0 flex items-center justify-center bg-white/30">
        <span className="text-xs">Lofi</span>
        <div
          className="absolute inset-0 bg-black/40 rounded-md flex items-center justify-center group-hover:opacity-100 opacity-0 transition-all z-10"
          onClick={isPlaying ? onPaused : onPlay}
        >
          {isPlaying ? (
            <PauseIcon size={16} className="text-white" />
          ) : (
            <PlayIcon size={16} className="text-white" />
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium line-clamp-1 capitalize" title={name}>
          {name}
        </span>
        <span className="text-xs text-muted-foreground line-clamp-1">{artist}</span>
      </div>
      <Button
        size="icon-sm"
        variant="blur"
        className="flex-shrink-0 ml-auto"
        title={isPlaying ? 'Dừng' : 'Phát'}
        onClick={isPlaying ? onPaused : onPlay}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </Button>
    </div>
  );
};
