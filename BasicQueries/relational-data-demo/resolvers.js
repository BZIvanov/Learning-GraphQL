// Demo user data
const users = [
  { id: "1", name: "Andrew", email: "andrew@example.com", age: 27 },
  { id: "2", name: "Sarah", email: "sarah@example.com" },
  { id: "3", name: "Mike", email: "mike@example.com" },
];

const posts = [
  {
    id: "10",
    title: "GraphQL 101",
    body: "This is how to use GraphQL...",
    published: true,
    author: "1",
  },
  {
    id: "11",
    title: "GraphQL 201",
    body: "This is an advanced GraphQL post...",
    published: false,
    author: "1",
  },
  {
    id: "12",
    title: "Programming Music",
    body: "",
    published: false,
    author: "2",
  },
];

export const resolvers = {
  Query: {
    // args are incoming parameters from the client
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

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
    me() {
      return { id: "123098", name: "Mike", email: "mike@example.com" };
    },
    post() {
      return {
        id: "1",
        title: "GraphQL 101",
        body: "",
        published: false,
        author: "2",
      };
    },
  },
  Post: {
    // when this type is used in a query it will be called with the respective parent each time, so if we use this Post as array [Post!]! this method will be called as many times as elements in the array
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
  },
};
