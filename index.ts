import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import config from 'config';
import { typeDefs } from './src/graphql/typeDefs.graphql';
import { resolvers } from './src/graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

mongoose.connect(config.get('mongoDbUrl'))
  .then(() => {
    return  server.listen({port: 5000})
  })
  .then(res => {
    console.log(`Server running at ${res.url}`)
  })
