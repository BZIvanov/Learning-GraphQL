```
subscription {
  count
}
```

```
mutation {
  createComment(data: { text: "My text", author: 2, post: 10 }) {
    id
    text
  }
}
```

```
subscription {
  comment(postId: 12) {
    id
    text
    author {
      id
      name
    }
  }
}
```
