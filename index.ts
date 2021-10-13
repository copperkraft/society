import mongoose from 'mongoose';
import config from 'config';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './src/resolvers/user.resolver';
import { ApolloServer } from 'apollo-server';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  await mongoose.connect(config.get('mongoDbUrl'))

  const server = new ApolloServer({ schema });

  const { url } = await server.listen(config.get('port'));
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
