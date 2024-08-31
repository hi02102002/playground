import { z } from 'zod';

export const ResponseSchema = z.object({
  data: z.any().optional(),
  message: z.string().default('The request was successful.').optional(),
});

export type ResponseSchemaType = z.infer<typeof ResponseSchema>;
