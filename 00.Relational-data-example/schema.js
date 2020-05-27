const { gql } = require('apollo-server-express');

// Scalar types - String, Boolean, Int, Float, ID

// here type Query is important to be written like this, it is not optional
// missing exclamation mark means the return value could be null
// on the client we need to specify the same way (query: "something") not just ("something")
exports.typeDefs = gql`
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }
`;

/*
if we request post it is of type Post, but the Post has author, which is not of a scalar 
type and for it we need to create custom resolver function to handle it. The property has to be named again Post
and it is object with author property where we specify the logic to get the desired author
*/
