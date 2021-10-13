import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class User {
  @Field(() => ID)
  id!: string;

  @Field()
  @prop({required: true})
  email!: string;

  @Field()
  @prop({required: true})
  createdAt!: string;

  @Field()
  @prop({required: true})
  username!: string;

  @prop({required: true})
  hashedPassword!: string;

  @Field({nullable: true})
  token?: string;
}

const UserModel = getModelForClass(User);

export { UserModel, User }
