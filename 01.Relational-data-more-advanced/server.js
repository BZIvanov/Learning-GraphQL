const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
server.applyMiddleware({ app });

const port = process.env.PORT || 3100;
app.listen(port, () =>
  console.log(`Server listening on port http://localhost:${port}/graphql`)
);
