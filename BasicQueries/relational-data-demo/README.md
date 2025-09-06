# Relational Data Demo

This project demonstrates how to work with relational data. It provides a simple example of querying related entities, such as users, posts, and comments, to showcase the power of GraphQL in handling data relationships.

To play with this demo visit `http://localhost:4000/` and under `Operation` section provide one of the query examples from the file `examples.graphql`.

## Features

- Sample data for users, posts, and comments
- GraphQL schema defining types and relationships
- Resolvers for fetching relational data
- Example queries to explore relationships between entities

## Structure

- `demo-data.js`: Contains sample data for the demo
- `schema.js`: Defines the GraphQL schema and relationships
- `resolvers.js`: Implements resolver functions for queries
- `index.js`: Entry point to start the GraphQL server
- `queries.graphql`: Example queries to test the API
- `package.json`: Project dependencies and scripts

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node index.js
   ```
3. Use a GraphQL client or IDE to run queries from `queries.graphql` and explore the relational data.
