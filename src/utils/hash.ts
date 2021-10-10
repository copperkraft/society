import { createHash } from 'crypto';

export const getHash = (password: string, salt: string) => {
  const hash = createHash('sha512');

  hash.update(password, 'utf8');
  hash.update(salt, 'utf8');

  return hash.digest('base64');
};
