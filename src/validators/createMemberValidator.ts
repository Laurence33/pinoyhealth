import { z } from 'zod/v4';

const createMemberValidator = z.object({
  employer_number: z.string(),
  last_name: z.string(),
  first_name: z.string(),
  date_of_birth: z
    .string()
    .transform((str) => new Date(str))
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Invalid date format',
    }),
  email_address: z.email(),
  telephone_number: z.string(),
  permanent_address: z.string(),
});

export { createMemberValidator };
