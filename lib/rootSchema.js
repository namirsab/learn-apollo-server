'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphqlTools = require('graphql-tools');

var _schema = require('./types/book/schema.js');

var _schema2 = _interopRequireDefault(_schema);

var _resolvers = require('./types/book/resolvers.js');

var _resolvers2 = _interopRequireDefault(_resolvers);

var _schema3 = require('./types/schema.js');

var _schema4 = _interopRequireDefault(_schema3);

var _resolvers3 = require('./types/resolvers.js');

var _resolvers4 = _interopRequireDefault(_resolvers3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = 'schema {\n        query: Query\n    }\n';

var typeDefs = [_schema2.default, _schema4.default, Schema];

var resolvers = _extends({}, _resolvers2.default, _resolvers4.default);

exports.default = (0, _graphqlTools.makeExecutableSchema)({
    typeDefs: typeDefs,
    resolvers: resolvers
});