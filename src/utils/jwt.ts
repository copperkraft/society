import config from 'config';
import * as fs from 'fs';
import { sign, verify } from 'jsonwebtoken';

const getKey = (keyConfig: { value: string } | { path: string }) => {
  if ('value' in keyConfig) {
    return keyConfig.value;
  }
  if ('path' in keyConfig) {
    return fs.readFileSync(keyConfig.path);
  }
  throw new Error('No key provided for jwt');
};

const privateKey = getKey(config.get('privateKey'));
const publicKey = getKey(config.get('publicKey'));

export const signJWT = (payload: object) => sign(payload, privateKey, { algorithm: 'RS256' });

export const verifyJWT = (token: string) => {
  const decrypted = verify(token, publicKey, { algorithms: ['RS256'] });

  if (typeof decrypted === 'string') {
    throw new Error('token should contain object');
  }

  return decrypted as { [key: string]: any };
};
