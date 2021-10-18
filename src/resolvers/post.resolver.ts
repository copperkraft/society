import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { Post, PostModel } from '../models/post.model';
import { UserInputError } from 'apollo-server';
import { Service } from 'typedi';

@Service()
@Resolver(Post)
export class PostResolver {
  @Query(() => Post)
  async getPost(@Arg('id') id: string): Promise<Post> {
    const post = await PostModel.findById(id);
    if (!post) {
      throw new UserInputError('not found');
    }
    return post;
  }

  @Query(() => [Post])
  async getPosts(): Promise<Post[]> {
    return PostModel.find({});
  }

  @Mutation(() => Post)
  @Authorized()
  async createPost(@Arg('body') body: string): Promise<Post> {
    return PostModel.create({
      body,
      createdAt: new Date().toISOString(),
    });
  }

  @Mutation(() => Post)
  async deletePost(@Arg('id') id: string): Promise<Boolean> {
    const deletedResult = await PostModel.deleteOne({ id });

    return !!deletedResult.deletedCount;
  }
}
