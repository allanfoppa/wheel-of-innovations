import { z } from 'zod';

export const createChallengeSchema = z
  .object({
    backLang: z.number(),
    backFramework: z.number(),
    databaseLanguage: z.number(),
    frontLang: z.number(),
    frontFramework: z.number(),
    isDesignNeeded: z.boolean(),
    deadline: z.string(),
  })
  .required();

export type CreateChallengeDto = z.infer<typeof createChallengeSchema>;
