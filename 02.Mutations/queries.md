```
mutation {
  createUser(data: {
    name: "Milica",
    email: "milica@abv.bg",
  }) {
    name
  }
}
```

```
query {
  users {
    name
    id
  }
}
```

```
mutation {
  createPost(data: {
    title: "Make profit",
    body: "Be very succesfull",
    published: true,
    author: "38f257db-f542-4f79-b297-8d417b285552"
  }) {
    id
    title
    author {
      name
      age
    }
  }
}
```

```
mutation {
  updatePost(
    id: "ad26de09-a512-463c-b6dc-fe9774beaa6a"
    data: { body: "Be very succesfull and loved" }
  ) {
    title
    body
  }
}
```

```
query {
  posts {
    title
    body
    author {
      name
      id
    }
  }
}
```
