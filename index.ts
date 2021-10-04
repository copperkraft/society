import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';
import config from 'config';
import { PostModel } from './models/post.model';

console.log('10 out of 10');

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
  }
`

const resolvers = {
  Query: {
    getPosts: async () => {
      const posts = await PostModel.find({});
      console.log(posts);
      return posts;
    }
  }
}

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
