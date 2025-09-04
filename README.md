# Learning GraphQL

**GraphQL** is a query language for APIs that allows clients to request exactly the data they need, reducing over-fetching and under-fetching. It uses a strongly typed schema to define the data structure, enabling powerful developer tooling and introspection. Unlike REST, GraphQL typically operates through a single endpoint for queries, mutations, and real-time subscriptions.

1. GraphQL allows us to get all the data we need in a single http request.
2. With GraphQL we can get only specific data we need which means it will all works faster.
3. GraphQL creates fast and flexible APIs, giving clients complete control to ask for just the data they need.
4. Fewer HTTP requests. Flexible data querying. Less code to manage.

## GraphQL operation

There are 3 major types of operations we can perform.

1. query - with query we can query some data
   When we nested query an object like 'me' in this example we need to specify which properties we want, it can not be just 'me'

```javascript
query {
    hello
    courseInstructor
    me {
        name
    }
}
```

2. mutation - to transform some data in a way we want

3. subscription - watch data for changes

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
