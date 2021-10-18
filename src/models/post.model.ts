import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Post {
  @Field()
  id!: string;

  @Field()
  @prop({required: true})
  body!: string;

  @Field()
  @prop({required: true})
  createdAt!: string;
}

const PostModel = getModelForClass(Post);

export { PostModel }
