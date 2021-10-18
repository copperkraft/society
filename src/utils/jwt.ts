import config from 'config';
import * as fs from 'fs';
import { sign, verify } from 'jsonwebtoken';
import { User } from '../models/user.model';

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

export const signUserJWT = ({ id, username }: User) => signJWT({ id, username });

export const decryptJWT = (token: string) => {
  const decrypted = verify(token, publicKey, { algorithms: ['RS256'] });

  if (typeof decrypted !== 'object') {
    throw new Error('token should contain object');
  }

  return decrypted as { [key: string]: any };
};
