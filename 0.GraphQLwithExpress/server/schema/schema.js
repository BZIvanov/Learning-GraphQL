const graphql = require('graphql');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

//dummy data
const books = [
    {name: 'Name of the wind', genre: 'Fantasy', id: '1', authorId: '1'},
    {name: 'The final empire', genre: 'Fantasy', id: '2', authorId: '2'},
    {name: 'The long earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
    {name: 'The hero of ages', genre: 'Fantasy', id: '4', authorId: '2'},
    {name: 'The colour of magic', genre: 'Sci-Fi', id: '5', authorId: '3'},
    {name: 'The light fantastic', genre: 'Fantasy', id: '6', authorId: '3'},
];
const authors = [
    {name: 'Pathrick Rothfuss', age: 44, id: '1'},
    {name: 'Brandon Sanderson', age: 42, id: '2'},
    {name: 'Terry Winzon', age: 27, id: '3'}
];

// fields property is important to be a function because we have relational data where AuthorType is not yet defined and when using function it will be defined at the point the file is executed
// the parent parameter is the book on which we can access its own properties
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.filter(x => x.id === parent.authorId);
            }
        }
    })
});

// here we use GraphQLList because we will have potentially more than one book and we provide to that function what type of data it will be
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter(x => x.authorId === parent.id);
            }
        }
    })
});

// book property here will be what is on the request url
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {  id: {type: GraphQLID} },
            resolve(parent, args) {
                return books.filter(x => x.id === args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {  id: {type: GraphQLID} },
            resolve(parent, args) {
                return authors.filter(x => x.id === args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
