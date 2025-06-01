import { customAlphabet } from 'nanoid';
function generateRandomId() {
  const nanoIdNumber = customAlphabet('0123456789', 12);
  const id = nanoIdNumber();
  return id;
}

export { generateRandomId };
