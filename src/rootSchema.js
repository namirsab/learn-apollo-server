import { makeExecutableSchema } from 'graphql-tools';
import BookSchema from './types/book/schema.js';
import BookResolvers from './types/book/resolvers.js';
import QuerySchema from './types/schema.js';
import QueryResolvers from './types/resolvers.js';

const Schema = `schema {
        query: Query
    }
`;

const typeDefs = [BookSchema, QuerySchema, Schema];

const resolvers = {
    ...BookResolvers,
    ...QueryResolvers,
};

export default makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
        requireResolversForNonScalar: false,
    },
});
