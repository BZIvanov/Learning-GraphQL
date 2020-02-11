const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');

const events = eventIds => {
  return Event.find({_id: {$in: eventIds}})
    .then(events => {
      return events.map(event => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event.creator)
        }
      })
    })
    .catch(err => {
      throw err;
    });
}

const user = userId => {
  return User.findById(userId)
    .then(user => {
      return {
        ...user._doc,
        _id: user.id,
        createdEvents: events.bind(this, user._doc.createdEvents)
      };
    })
    .catch(err => {
      throw err;
    });
}


module.exports = {
  events: () => {
    return Event.find()
      .then(events => {
        return events.map(event => {
          return {
            ...event._doc,
            _id: event._doc._id.toString(),
            date: new Date(event._doc.date).toISOString(),
            creator: user.bind(this, event._doc.creator)
          };   // graphql can not recognize the mongoose id type and here is how we turn it to string
        })
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  createEvent: (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5e4257eb9ebf091aa3c0b54e',
    });
    let createdEvent;
    return event.save().then(result => {
      // event.id is another way to get the id instead of converting it to string. Its a easy way provided by mongoose
      createdEvent = {
        ...result._doc,
        _id: event.id,
        date: new Date(result._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator)
      };    //._doc is provided by mongoose and will show us all the properties
      return User.findById('5e4257eb9ebf091aa3c0b54e');
    }).then(user => {
      if (!user) {
        throw new Error('User not found.');
      }
      user.createdEvents.push(event)   // push method is provided by mongoose and pass the whole event and mongoose we find the id from it
      return user.save();
    }).then(result => {
      return createdEvent;
    }).catch(err => {
      console.log(err);
      throw err;                 // here we throw err so graphql can handle it
    });
  },
  createUser: (args) => {
    return User.findOne({email: args.userInput.email}).then(user => {
      if (user) {
        throw new Error('User exists already');
      }
      return bcrypt.hash(args.userInput.password, 12);
    }).then(hashedPassword => {
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      return user.save();
    }).then(result => {
      return {...result._doc, password: null, _id: result.id};
    }).catch(err => {
      throw err;
    });
  }
};
