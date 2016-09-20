'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphqlTools = require('graphql-tools');

var typeDefs = ['\n    type Query {\n        hello: String\n    }\n    \n    schema {\n        query: Query\n    }\n'];

var resolvers = {
    Query: {
        hello: function hello(root) {
            return 'world';
        }
    }
};

exports.default = (0, _graphqlTools.makeExecutableSchema)({
    typeDefs: typeDefs,
    resolvers: resolvers
});