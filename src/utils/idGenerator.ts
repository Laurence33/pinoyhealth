import { nanoid } from 'nanoid';
function generateRandomId() {
  const id = nanoid(12);
  return id;
}

export { generateRandomId };
