import 'server-only';

import ytdl from 'ytdl-core';

import { getVideoUtubeUrl } from '@/utils';

export const getPlayUrl = async (videoId: string) => {
  const url = getVideoUtubeUrl(videoId);

  const videoInfo = await ytdl.getInfo(url);

  const audioFormats = ytdl.filterFormats(videoInfo.formats, 'audioonly');

  const audioFormat = ytdl.chooseFormat(audioFormats, {
    quality: 'highestaudio',
  });

  return audioFormat.url;
};
