'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _apolloServer = require('apollo-server');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _rootSchema = require('./rootSchema.js');

var _rootSchema2 = _interopRequireDefault(_rootSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT;

var app = (0, _express2.default)();

// graphql endpoint
app.use('/graphql', _bodyParser2.default.json(), (0, _apolloServer.apolloExpress)({ schema: _rootSchema2.default }));

// graphiql
app.use('/graphiql', (0, _apolloServer.graphiqlExpress)({ endpointURL: '/graphql' }));

app.listen(PORT, function () {
  return 'App listening in port ' + PORT;
});