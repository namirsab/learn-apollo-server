import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import rootSchema from './rootSchema.js';

const PORT = process.env.PORT;
console.log(PORT);

const app = express();

// graphql endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: rootSchema }));

// graphiql
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, () => `App listening in port ${PORT}`);
