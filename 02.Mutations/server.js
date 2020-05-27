const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs } = require('./schema');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Post = require('./resolvers/Post');
const Comment = require('./resolvers/Comment');

const db = require('./db');

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment,
  },
  // the context will be provided to the resolvers as the third parameter
  context: {
    db,
  },
});

const app = express();
server.applyMiddleware({ app });

const port = process.env.PORT || 3100;
app.listen(port, () =>
  console.log(`Server listening on port http://localhost:${port}/graphql`)
);
