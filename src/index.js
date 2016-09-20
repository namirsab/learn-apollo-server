import express from 'express';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import bodyParser from 'body-parser';
import rootSchema from './rootSchema.js';

const PORT = process.env.PORT;

const app = express();

// graphql endpoint
app.use('/graphql', bodyParser.json(), apolloExpress({ schema: rootSchema }));

// graphiql
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, () => `App listening in port ${PORT}`);