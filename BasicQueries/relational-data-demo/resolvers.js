import { users, posts, comments } from "./demo-data.js";

export const resolvers = {
  Query: {
    // args are incoming parameters from the client
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      // for User type from the schema we can see we are also returning posts and comments
      // but because they are not on the user object, they will be resolved by types at the bottom of this file
      return users.filter((user) =>
        user.name.toLowerCase().includes(args.query.toLowerCase())
      );
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter((post) => {
        const titleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const bodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return titleMatch || bodyMatch;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => post.id === args.id);
    },
    comments(parent, args, ctx, info) {
      return comments;
    },
    me() {
      return { id: "123098", name: "Mike", email: "mike@example.com" };
    },
  },
  Post: {
    // when this type is used in a query it will be called with the respective parent each time, so if we use this Post as array [Post!]! this method will be called as many times as elements in the array
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.post === parent.id);
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => post.id === parent.post);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.author === parent.id);
    },
  },
};
