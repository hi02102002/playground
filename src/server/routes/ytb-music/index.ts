import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';
import YTMusic from 'ytmusic-api';
import * as z from 'zod';

import { getPlayUrl } from '@/server/services/utube';
import { ContextVariables } from '@/server/types';
import { getDefaultSuccessResponse } from '@/utils/server';
import { SongDetailedSchema } from '@/validator-schema/ytb-music';

const ytmusic = new YTMusic();

export const ytbMusicApp = new OpenAPIHono<{
  Variables: ContextVariables;
}>()
  .openapi(
    createRoute({
      method: 'get',
      path: '/search',
      tags: ['Youtube Music'],
      summary: '',
      responses: {
        200: getDefaultSuccessResponse(z.array(SongDetailedSchema.openapi('SongDetailedSchema'))),
      },
      request: {
        query: z.object({
          q: z.string().optional(),
        }),
      },
    }),
    async (c) => {
      await ytmusic.initialize();

      const songDetaileds = await ytmusic.searchSongs(c.req.query('q') || '');

      return c.json(
        {
          data: songDetaileds,
        },
        200,
      );
    },
  )
  .openapi(
    createRoute({
      method: 'get',
      path: '/get-url/{videoId}',
      tags: ['Youtube Music'],
      summary: 'Get play url of a song',
      responses: {
        200: getDefaultSuccessResponse(z.string()),
      },
      request: {
        params: z.object({
          videoId: z.string(),
        }),
      },
    }),
    async (c) => {
      const videoId = c.req.param('videoId');

      if (!videoId) {
        throw new HTTPException(StatusCodes.BAD_REQUEST);
      }

      const url = await getPlayUrl(videoId);

      return c.json(
        {
          data: url,
        },
        StatusCodes.OK,
      );
    },
  );
