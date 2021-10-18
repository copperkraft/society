import { UserService } from '../services/user.service';
import { ResolverData, UnauthorizedError } from 'type-graphql';
import { Context } from './context';
import { Service } from 'typedi';

@Service()
export class AuthChecker {
  constructor(private readonly userService: UserService) {
  }

  async check({context: {user}}: ResolverData<Context>, roles: string[]) {
    if (!user) {
      throw new UnauthorizedError();
    }

    const {id} = user;

    // TODO: get user from db
    return !!id;
  }
}
