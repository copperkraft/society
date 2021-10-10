import { PostModel } from '../../models/post.model';
import { QueryResolvers } from '../types.generated';

export const getPosts: QueryResolvers['getPosts'] = async () => {
  const posts = await PostModel.find({}).exec();
  console.log(posts[0].id);
  return posts;
};

