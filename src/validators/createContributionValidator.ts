import { z } from 'zod/v4';

const createContributionValidator = z.object({
  month: z
    .string()
    .transform((str) => new Date(str))
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Invalid date format',
    }),
  employer_share: z.number(),
  member_share: z.number(),
});

export { createContributionValidator };
