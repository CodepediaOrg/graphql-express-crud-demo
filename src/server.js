const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema');
const jwt = require('jsonwebtoken');

const accessTokenService = require('./access-token.service');

const app = express();

const setAccessTokenMiddleware = async (req, res, next) => {
  const accessToken = await accessTokenService.getKeycloakAccessToken();
  req.bearerToken = 'Bearer ' + accessToken;

  const decoded = jwt.decode(accessToken);
  const userId = decoded.sub;
  req.userId = userId;
  next();
}

app.use(setAccessTokenMiddleware);

app.use('/graphql', graphqlHTTP({
  // GraphQL’s data schema
  schema: schema,
  // Pretty Print the JSON response
  pretty: true,
  // Enable GraphiQL dev tool
  graphiql: true
}));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
