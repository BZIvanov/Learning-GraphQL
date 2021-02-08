const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema');

const app = express();

/* 
1. It works as a middleware
2. expressGraphQL is a variable which holds function which will execute the middleware on each request
*/
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Now listening on port 4000');
});
