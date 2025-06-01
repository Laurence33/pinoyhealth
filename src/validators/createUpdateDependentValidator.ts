import { z } from 'zod/v4';

const createUpdateDependentValidator = z.object({
  last_name: z.string(),
  first_name: z.string(),
  date_of_birth: z
    .string()
    .transform((str) => new Date(str))
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Invalid date format',
    }),
});

export { createUpdateDependentValidator };
