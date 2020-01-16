# Start the project

Run **npm start** and open *http://localhost:4000/graphql* in the browser.

# GraphQL

1. GraphQL allows us to get all the data we need in a single http request.
2. With GraphQL we can get only specific data we need which means it will all works faster.
3. GraphQL creates fast and flexible APIs, giving clients complete control to ask for just the data they need.
4. Fewer HTTP requests. Flexible data querying. Less code to manage.
5. The exclamation mark '!' after the the type of the field means we will always get something of that type and not null for example

Here is a [playground](https://graphql-demo.mead.io/) to test something on GraphQL

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

## Installation

To install GraphQL and GraphQL for express run the following

```javascript
npm install graphql express-graphql
```
