# Basic Queries

## Required Values

The **exclamation mark** (`!`) denotes that a field or argument is **non-nullable**, meaning it **must always have a value**.

```gql
# Here, id and name are required (!), while age is optional
type User {
  id: ID!
  name: String!
  age: Int
}
```

## Content of this section

- relational-data-demo
