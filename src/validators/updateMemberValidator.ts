import { z } from 'zod/v4';

const updateMemberValidator = z.object({
  last_name: z.string().optional(),
  first_name: z.string().optional(),
  date_of_birth: z
    .string()
    .transform((str) => new Date(str))
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Invalid date format',
    })
    .optional(),
  email_address: z.email().optional(),
  telephone_number: z.string().optional(),
  permanent_address: z.string().optional(),
});

export { updateMemberValidator };
