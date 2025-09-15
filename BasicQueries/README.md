# Basic Queries

## Required Values

The **exclamation mark** (`!`) denotes that a field or argument is **non-nullable**, meaning it **must always have a value**.

```graphql
# Here, id and name are required (!), while age is optional
type User {
  id: ID!
  name: String!
  age: Int
}
```

## Querying fields

You must specify the exact fields you want (e.g., you can’t just ask for `me`, you need to request its properties).

```graphql
query {
  hello
  courseInstructor
  me {
    name
  }
}
```

## Content of this section

- basic-queries-demo
- relational-data-demo
