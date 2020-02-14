const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');

const events = async eventIds => {
  try {
    const events = await Event.find({_id: {$in: eventIds}})
    return events.map(event => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator)
      };
    });
  } catch(err) {
    throw err;
  };
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch(err) {
    throw err;
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return {
          ...event._doc,
          _id: event._doc._id.toString(),
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator)
        };   // graphql can not recognize the mongoose id type and here is how we turn it to string
      });
    } catch(err) {
      throw err;
    }
  },
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5e41c308a4418b35f4bfd21a',
    });
    let createdEvent;
    try {
      const result = await event.save();
      // event.id is another way to get the id instead of converting it to string. Its a easy way provided by mongoose
      createdEvent = {
        ...result._doc,
        _id: event.id,
        date: new Date(result._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator)
      };    //._doc is provided by mongoose and will show us all the properties
      const creator = await User.findById('5e41c308a4418b35f4bfd21a');
      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdEvents.push(event);   // push method is provided by mongoose and pass the whole event and mongoose we find the id from it
      await creator.save();
      return createdEvent;
    } catch(err) {
      console.log(err);
      throw err;  // here we throw err so graphql can handle it
    }
  },
  createUser: async args => {
    try {
      const existingUser = await User.findOne({email: args.userInput.email});
      if (existingUser) {
        throw new Error('User exists already');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });

      const result = await user.save();

      return {...result._doc, password: null, _id: result.id};
    } catch(err) {
      throw err;
    }
  }
};
