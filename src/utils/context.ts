import { User } from '../models/user.model';
import { ExpressContext } from 'apollo-server-express/src/ApolloServer';
import { ContextFunction } from 'apollo-server-core/src/types';
import { decryptJWT } from './jwt';
import { UserInputError } from 'apollo-server';

export interface Context {
  user?: Partial<User>
}

const decryptUserJWT = (token: string) => {
  const { id, username } = decryptJWT(token);

  if (!id || !username) {
    throw new UserInputError('user token is invalid');
  }

  return { id, username };
}


export const contextChecker: ContextFunction<ExpressContext, Context> = ({ req }) => {
  const token = req.headers.authorization;

  const ctx: Context = {
    user: token ? decryptUserJWT(token) : undefined,
  };

  return ctx;
}
