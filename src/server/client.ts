import { hc } from 'hono/client';

import { type AppType } from '@/server';
import { getBaseUrl } from '@/utils';

export const client = hc<AppType>(getBaseUrl());
