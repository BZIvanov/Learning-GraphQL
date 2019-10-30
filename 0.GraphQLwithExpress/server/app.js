const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./schema/schema');

const app = express();

/* 
1. It works as a middleware
2. graphqlHTTP is a variable which holds function which will execute the middleware on each request
*/
app.use('/graphql', graphqlHTTP({
    schema
}));

app.listen(4000, () => {
    console.log('Now listening on port 4000');
});


/* the query string may look like this
{
    book(id: '1') {
        name
        genre
        id
    }
}
*/

/* or like this
{
    book(id: '1') {
        name
        genre
        author {
            name
            age
        }
    }
}
*/

/* or like this
{
    authors {
        name
        books {
            name
            genre
        }
    }
}
*/
