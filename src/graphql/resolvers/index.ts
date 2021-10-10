import { getPosts } from './post.resolver';
import { register } from './user.resolver';

export const resolvers = {
  Query: {
    getPosts
  },
  Mutation: {
    register
  }
}
