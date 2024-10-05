import { z } from 'zod';

export const SongDetailedSchema = z.object({
  type: z.literal('SONG'),
  name: z.string(),
  videoId: z.string(),
  artist: z.object({
    artistId: z.string().nullable(),
    name: z.string(),
  }),
  album: z
    .object({
      name: z.string(),
      albumId: z.string(),
    })
    .nullable(),
  duration: z.number().nullable(),
  thumbnails: z.array(
    z.object({
      url: z.string(),
      width: z.number(),
      height: z.number(),
    }),
  ),
});
