import { z } from 'zod/v4';

const updateContributionValidator = z.object({
  employer_number: z.string(),
  member_number: z.string(),
  member_share: z.number(),
  employer_share: z.number(),
  month: z
    .string()
    .transform((str) => new Date(str))
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Invalid date format',
    }),
});

export { updateContributionValidator };
