import { nanoid } from 'nanoid';
function generateRandomId() {
  const id = nanoid(12);
  console.log(id);
  return id;
}

export { generateRandomId };
