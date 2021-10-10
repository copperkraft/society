import { randomBytes } from 'crypto';

export const getSalt = () => {
  const buffer = randomBytes(16);
  return buffer.toString('hex');
};
