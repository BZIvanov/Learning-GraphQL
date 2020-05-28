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

Subscribe to post

```
subscription {
  post {
    id
    title
    body
    author {
      id
      name
    }
  }
}
```

Create a new post in another tab and when you switched to the tab in the playground, where you have subscribed to post you should see the post data.

```
mutation {
  createPost(
    data: {
      title: "Make profit"
      body: "Be very succesfull"
      published: true
      author: "3"
    }
  ) {
    id
    title
    body
    published
  }
}
```
