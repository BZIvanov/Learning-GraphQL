const Subscription = {
    comment: {
        // with destructuring we only get some of the properties from the subscribe function arguments
        subscribe(parent, { postId }, { db, pubsub }, info){
            const post = db.posts.find((post) => post.id === postId && post.published);

            if (!post) {
                throw new Error('Post not found');
            }

            // here we don't return any data, here we only set the name of the channel to which we can subscribe
            return pubsub.asyncIterator(`comment ${postId}`);
        }
    },
    post: {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator('post');
        }
    }
};

export { Subscription as default };
