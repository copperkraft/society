import { MutationResolvers } from '../types.generated';
import { UserModel } from '../../models/user.model';
import { getSalt } from '../../utils/salt';
import { getHash } from '../../utils/hash';
import { signJWT } from '../../utils/jwt';
import { UserInputError } from 'apollo-server';

export const register: MutationResolvers['register'] = async (
  parent,
  { registerInput: { username, password, email }}
) => {
  if (await UserModel.findOne({ username })) {
    throw new UserInputError('Username is taken', {
      errors: {
        username: 'This username is taken'
      }
    });
  }

  const salt = getSalt();
  const hash = getHash(password, salt);
  const createdAt = new Date().toISOString();

  try {
    const user = await UserModel.create({
      username,
      email,
      createdAt,
      hash,
      salt,
    });

    const token = signJWT({
      id: user.id,
      username: user.username,
    });

    return { ...user.toObject(), token, id: user.id }
  } catch (e) {
    console.log(e);
    throw new Error('Unable to create user');
  }
};

