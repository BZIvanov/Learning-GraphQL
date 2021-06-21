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

### Specifics

- GraphQL playground is constantly sending requests to our server to have updated schema. We can change the settings if needed by clicking the icon top-right corner.

- Data ending with exclamation mark '!' means it is required and can not be null

- input in type definitions are not necessary but good to use and provide them as function arguments because this way the code is easier to read and we can reuse the inputs in other function arguments

### Hint

With ctrl + space in the playground you can expand the list with available keys.

### Enums in the schema

The point of using enum is if we want to enforce specific options only.

For example if we have String! it could be any string and what if we want just a few specific options like let's say: ON, OFF, SLEEP

The other benefit is if we want strings or booleans, if we set string then we will not have the boolean. With enum we can specify some string and boolean values that we want to accept for example

### Working with files

GraphQL is working with .json objects and in case we need to work with files a solution is to use rest endpoint just for the file. Our API will basically handle all the json data with graphql and separate rest routes for files.
