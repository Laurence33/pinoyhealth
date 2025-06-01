import { z } from 'zod/v4';

const updateMemberEmployerNumberValidator = z.object({
  employer_number: z.string(),
});

export { updateMemberEmployerNumberValidator };
