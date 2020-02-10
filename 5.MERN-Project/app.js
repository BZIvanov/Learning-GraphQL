const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
require('./config/database')();
const Event = require('./models/event');
const User = require('./models/user');
const bcrypt = require('bcryptjs');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type User {
      _id: ID!
      email: String!
      password: String
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return Event.find().then(events => {
        return events.map(event => {
          return {...event._doc, _id: event._doc._id.toString()};   // graphql can not recognize the mongoose id type and here is how we turn it to string
        })
      }).catch(err => {
        console.log(err);
        throw err;
      });
    },
    createEvent: (args) => {
      console.log(args)
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: '5e41c308a4418b35f4bfd21a',
      });
      let createdEvent;
      return event.save().then(result => {
        // event.id is another way to get the id instead of converting it to string. Its a easy way provided by mongoose
        createdEvent = {...result._doc, _id: event.id};    //._doc is provided by mongoose and will show us all the properties
        return User.findById('5e41c308a4418b35f4bfd21a');
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
  },
  graphiql: true
}));

app.listen(4001);
