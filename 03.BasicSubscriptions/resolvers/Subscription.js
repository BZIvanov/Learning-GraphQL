module.exports = {
  // as usual the count name should match the name in our schema
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;
      console.log('HEREEE');
      setInterval(() => {
        count++;
        // the publish method is what will return the value to the client, in this case we need to return number value as described in the schema
        pubsub.publish('count', {
          count,
        });
      }, 1000);

      // in subscriptions instead the value described in the schema we return this function call
      // the parameter is the name of the channel we want to create
      return pubsub.asyncIterator('count');
    },
  },
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const post = db.posts.find(
        (post) => post.id === postId && post.published
      );

      if (!post) {
        throw new Error('Post not found');
      }

      // this way we create unique name for our channel which will be for specific comment
      return pubsub.asyncIterator(`comment ${postId}`);
    },
  },
  post: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator('post');
    },
  },
};
