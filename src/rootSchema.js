import { makeExecutableSchema } from 'graphql-tools';
import makeBooks from './books.js';

const typeDefs = [`
    type Query {
        books(count: Int!): [Book]
    }
    
    type Book {
        title: String!
        code: String!
    }
    
    schema {
        query: Query
    }
`];

const resolvers = {
    Query: {
        books: {
            description: 'Return all book',
            resolve(root, { count }) {
                return makeBooks(count);
            }
        }
    },
    Book: {
        __description: 'A simple book'
    }
};

export default makeExecutableSchema({
    typeDefs,
    resolvers
});