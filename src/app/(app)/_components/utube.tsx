import { MusicNotesMinus, MusicNotesPlus } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { Loader2, PauseIcon, PlayIcon } from 'lucide-react';
import Image from 'next/image';
import { pick } from 'ramda';
import { useDebounceValue } from 'usehooks-ts';
import { SongDetailed } from 'ytmusic-api';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UTUBE } from '@/data/utube';
import { useSelector } from '@/hooks/use-selecetor';
import { client } from '@/server/client';
import { useStore } from '@/store';
import { getUtubeVideoId, getVideoUtubeUrl } from '@/utils';

export const UtubeInputSearch = () => {
  const [search, setSearch] = useSelector({
    keys: ['ytb-music/search'],
    queryFn: () => 'Lofi',
  });

  return (
    <Input
      className="w-full border-white/20"
      placeholder="Nhập tên bài hát"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export const UtubeSearchResult = () => {
  const [search] = useSelector({
    keys: ['ytb-music/search'],
    queryFn: () => 'Lofi',
  });

  const [debounce] = useDebounceValue(search, 1000);

  const { data, isLoading } = useQuery({
    queryKey: ['ytb-music/search', { q: debounce }],
    queryFn: async () => {
      const res = await client.api['ytb-music'].search.$get({
        query: { q: debounce?.trim?.() || 'Lofi' },
      });

      const data = await res.json();

      return data.data as SongDetailed[];
    },
    initialData: UTUBE as SongDetailed[],
  });

  return (
    <div>
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center flex-col gap-2">
          <Loader2 size={24} className="animate-spin" />
          <span className="text-xs">Đang tìm kiếm kết quả &quot;{debounce}&quot;</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {data?.map((song) => (
            <UtubeSong
              key={song.videoId}
              song={{
                name: song.name,
                artist: song.artist.name || 'Không rõ',
                thumbnail: song.thumbnails[0].url,
                videoId: song.videoId,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const UtubeSong = ({
  song,
}: {
  song: Pick<SongDetailed, 'name' | 'videoId'> & {
    artist: string;
    thumbnail: string;
  };
}) => {
  const {
    addTrack,
    removeTrack,
    utubePlaylist,
    addUtubeTrack,
    currentTrackId,
    isPlaying,
    playlist,
    togglePlay,
  } = useStore((state) =>
    pick(
      [
        'addTrack',
        'removeTrack',
        'utubePlaylist',
        'addUtubeTrack',
        'setIsPlaying',
        'nextTrack',
        'currentTrackId',
        'isPlaying',
        'playlist',
        'togglePlay',
      ],
      state,
    ),
  );

  const isAdded = utubePlaylist[song.videoId] !== undefined;

  const _isPlaying = getUtubeVideoId(playlist[currentTrackId]) === song.videoId && isPlaying;

  return (
    <div className="flex items-center gap-3">
      <div
        className="size-10 relative rounded-md overflow-hidden cursor-pointer group flex-shrink-0"
        onClick={() => {
          if (_isPlaying) {
            togglePlay();
          } else {
            addTrack(getVideoUtubeUrl(song.videoId), true);
            addUtubeTrack({
              name: song.name,
              artist: song.artist,
              videoId: song.videoId,
              thumbnail: song.thumbnail,
            });
          }
        }}
      >
        <Image src={song.thumbnail} alt={song.name} className="object-cover w-full h-full" fill />
        <div className="absolute inset-0 bg-black/40 rounded-md flex items-center justify-center group-hover:opacity-100 opacity-0 transition-all z-10">
          {_isPlaying ? (
            <PauseIcon size={16} className="text-white" />
          ) : (
            <PlayIcon size={16} className="text-white" />
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium line-clamp-1" title={song.name}>
          {song.name}
        </span>
        <span className="text-xs text-muted-foreground line-clamp-1">{song.artist}</span>
      </div>
      <Button
        size="icon-sm"
        variant="blur"
        className="flex-shrink-0 ml-auto"
        title={isAdded ? 'Xóa khỏi danh sách' : 'Thêm vào danh sách'}
        onClick={() => {
          if (isAdded) {
            removeTrack(song.videoId);
          } else {
            addTrack(getVideoUtubeUrl(song.videoId));
            addUtubeTrack({
              name: song.name,
              artist: song.artist,
              videoId: song.videoId,
              thumbnail: song.thumbnail,
            });
          }
        }}
      >
        {isAdded ? <MusicNotesMinus /> : <MusicNotesPlus />}
      </Button>
    </div>
  );
};
