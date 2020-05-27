```
query {
  users {
    name
  }
}
```

```
query {
  users(query: "s") {
    name
  }
}
```

```
query {
  posts {
    title
    author {
      name
    }
  }
}
```
