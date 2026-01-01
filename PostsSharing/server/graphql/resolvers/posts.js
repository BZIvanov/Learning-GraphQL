const { AuthenticationError, UserInputError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    getPost: async (parent, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error('Post not found');
        }
        return post;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createPost: async (parent, { body }, context) => {
      const user = checkAuth(context);

      if (body.trim() === '') {
        throw new Error('Post body must not be empty');
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      context.pubsub.publish('NEW_POST', {
        newPost: post,
      });

      return post;
    },
    deletePost: async (parent, { postId }, context) => {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);

        if (user.username !== post.username) {
          throw new AuthenticationError('Action not allowed');
        }

        await post.delete();
        return 'Post deleted successfully';
      } catch (err) {
        throw new Error(err);
      }
    },
    likePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (!post) {
        throw new UserInputError('Post not found');
      }

      if (post.likes.find((like) => like.username === username)) {
        // Post already liked, unlike it
        post.likes = post.likes.filter((like) => like.username !== username);
      } else {
        // Not liked, like post
        post.likes.push({
          username,
          createdAt: new Date().toISOString(),
        });
      }

      await post.save();
      return post;
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST'),
    },
  },
};
