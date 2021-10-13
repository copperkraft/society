import { Field, InputType } from 'type-graphql';
import { IsAlphanumeric, IsEmail, Length } from 'class-validator';


@InputType()
class RegisterInput {
  @Field({ nullable: false })
  @IsEmail(undefined)
  email!: string;

  @Field({ nullable: false })
  @Length(4, 255)
  password!: string;

  @Field({ nullable: false })
  @Length(4, 63)
  @IsAlphanumeric(undefined)
  username!: string;
}

export { RegisterInput }
