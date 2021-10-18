import { Service } from 'typedi';
import { UserModel } from '../models/user.model';

@Service()
export class UserService {
  async get(id: string) {
    return UserModel.findById(id);
  }
}
