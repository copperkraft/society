import { User, UserModel } from '../models/user.model';
import { signUserJWT } from '../utils/jwt';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { RegisterInput } from './inputs/register.input';
import { UserInputError } from 'apollo-server';
import { compare, genSalt, hash } from 'bcrypt';
import { LoginInput } from './inputs/login.input';
import { DocumentType } from '@typegoose/typegoose';
import { Service } from 'typedi';

const userToReturnObject = (user: DocumentType<User>) => ({
  ...user.toObject(),
  id: user.id,
  token: signUserJWT(user),
})

@Service()
@Resolver(User)
export class UserResolver {
  @Query(() => User)
  async user(@Arg("id") id: string) {
    const user = await UserModel.findById(id);
    if (user === undefined) {
      throw new UserInputError('not found');
    }
    return user;
  }

  @Mutation(() => User)
  async login(
    @Arg('loginInput') { username, password }: LoginInput
  ): Promise<User> {
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new UserInputError('Wrong credentials', {
        errors: {
          general: `Wrong credentials`
        }
      });
    }

    const comparisonResult = await compare(password, user.hashedPassword)

    if (!comparisonResult) {
      throw new UserInputError('Wrong credentials', {
        errors: {
          general: 'Wrong credentials'
        }
      });
    }

    return userToReturnObject(user);
  }

  @Mutation(() => User)
  async registerUser(
    @Arg('userInput') { username, email, password }: RegisterInput,
  ): Promise<User> {
    //TODO: move logic to a service
    if (await UserModel.findOne({username})) {
      throw new UserInputError('Username is taken', {
        errors: {
          username: 'This username is taken'
        }
      });
    }

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const createdAt = new Date().toISOString();

    try {
      const user = await UserModel.create({
        username,
        email,
        createdAt,
        hashedPassword,
      });

      const token = signUserJWT(user);
      const id = user.id;

      return {...user.toObject(), id, token };
    } catch (e) {
      console.log(e);
      throw new Error('Unable to create user');
    }
  }
}
