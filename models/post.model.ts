import { getModelForClass, prop } from '@typegoose/typegoose';

class Post {
  @prop({ required: true })
  body!: string;

  @prop({ required: true })
  createdAt!: string;
}

const PostModel = getModelForClass(Post);

export { PostModel }
