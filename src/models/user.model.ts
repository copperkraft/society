import { getModelForClass, prop } from '@typegoose/typegoose';

class User {
  id!: string;

  @prop({ required: true })
  email!: string;

  @prop({ required: true })
  createdAt!: string;

  @prop({ required: true })
  username!: string;

  @prop({ required: true })
  hash!: string;

  @prop({ required: true })
  salt!: string;
}

const UserModel = getModelForClass(User);

export { UserModel }
