import { GraphQLServer } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';

// the context property below will provide whatever we want to all our resolvers
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment,
  },
  context: {
    db,
  },
});

server.start(() => {
  console.log('The server is up!');
});

/*
The mutation request can look like this:

mutation {
  createUser(name: "Ani", email: "ani@abv.bg") {
    id
    name
    email
    age
  }
}

We will get on the response the id, name, email and age which we will be null as we didnt provide it
*/
