# GraphQL

1. GraphQL allows us to get all the data we need in a single http request.
2. With GraphQL we can get only specific data we need which means it will all works faster.
3. GraphQL creates fast and flexible APIs, giving clients complete control to ask for just the data they need.
4. Fewer HTTP requests. Flexible data querying. Less code to manage.
5. The exclamation mark '!' after the the type of the field means we will always get something of that type and not null for example

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

## GraphQL with Node.js

When using graphql with node.js we can choose between different types of servers:

- **express-graphql** - popular to use
- **apollo-server-express** - popular to use and most examples will be with it
- **graphql-yoga** - build on top of apollo server so it is very similar
