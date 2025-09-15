# Learning GraphQL

**GraphQL** is a query language for APIs that allows clients to request exactly the data they need, reducing over-fetching and under-fetching. It uses a strongly typed schema to define the data structure, enabling powerful developer tooling and introspection. Unlike REST, GraphQL typically operates through a single endpoint for queries, mutations, and real-time subscriptions.

## Efficient and flexible data fetching

- **Single request:** Fetch all required data in one HTTP request.
- **Exact fields:** Request only the data you need, avoiding over-fetching.
- **Flexible APIs:** Clients control the structure of the response.
- **Efficiency:** Often fewer requests and smaller payloads compared to REST.

## GraphQL operations

There are 3 main types of operations in GraphQL:

1. **Query** – fetch data.
2. **Mutation** – modify data (create, update, or delete).
3. **Subscription** – receive real-time updates when data changes.

### Specifics

- input in type definitions are not necessary but good to use and provide them as function arguments because this way the code is easier to read and we can reuse the inputs in other function arguments

### Enums in the schema

The point of using enum is if we want to enforce specific options only.

For example if we have String! it could be any string and what if we want just a few specific options like let's say: ON, OFF, SLEEP

The other benefit is if we want strings or booleans, if we set string then we will not have the boolean. With enum we can specify some string and boolean values that we want to accept for example

### Working with files

GraphQL is working with .json objects and in case we need to work with files a solution is to use rest endpoint just for the file. Our API will basically handle all the json data with graphql and separate rest routes for files.

## Content

1. Introduction
2. BasicQueries
3. BasicMutations
4. BasicSubscriptions
