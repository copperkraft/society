import { Field, InputType } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';


@InputType()
class LoginInput {
  @Field({ nullable: false })
  @IsNotEmpty()
  password!: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  username!: string;
}

export { LoginInput }
