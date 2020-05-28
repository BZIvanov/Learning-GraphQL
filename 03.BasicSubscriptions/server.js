const http = require('http');
const express = require('express');
const { ApolloServer, PubSub } = require('apollo-server-express');

const { typeDefs } = require('./schema');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const User = require('./resolvers/User');
const Post = require('./resolvers/Post');
const Comment = require('./resolvers/Comment');

const db = require('./db');

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment,
  },
  context: {
    db,
    pubsub,
  },
});

const app = express();
server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT || 3100;
httpServer.listen(port, () =>
  console.log(`Server listening on port http://localhost:${port}/graphql`)
);
