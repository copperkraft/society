import mongoose from 'mongoose';
import config from 'config';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { UserResolver } from './resolvers/user.resolver';
import { PostResolver } from './resolvers/post.resolver';
import { Container } from 'typedi';
import { contextChecker } from './utils/context';
import { AuthChecker } from './utils/customAuthChecker';

export const bootstrap = async () => {
  console.log('starting server');

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      PostResolver,
    ],
    container: Container,
    authChecker: (context, roles) => {
      return Container.get(AuthChecker).check(context, roles)
    },
  });
  console.log('schema is built');

  await mongoose.connect(config.get('mongoDbUrl'));
  console.log('connected to the database');

  const server = new ApolloServer({
    schema,
    context: contextChecker,
  });

  const { url } = await server.listen(config.get('port'));
  console.log(`server is running, GraphQL Playground available at ${url}`);
}
