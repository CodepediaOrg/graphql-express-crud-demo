## Installation

### Prerequisites
What you need to run this app:
* `node` and `npm` (we recommend using [NVM](https://github.com/creationix/nvm))
  * Ensure you're running Node at least (`v10.x.x`+) and NPM (`6.x.x`+)
* [nodemon](https://nodemon.io/) - `npm install -g nodemon`
* **Docker** - we recommend using [Docker Desktop](https://www.docker.com/products/docker-desktop)


### Install dependencies
```
npm install 
```

## Start the project
```
npm start
```

which runs `nodemon --inspect=localhost:9230 src/server.js` in background.

> To debug connect to the port `9230` mentioned above

## Development
You can input your GraphQL queries with [GraphiQL](https://github.com/graphql/graphiql)
by accessing the [http://localhost:4000/graphql](http://localhost:4000/graphql) in your favorite browser

## Example client queries and mutations

You can find examples for GraphQL client queries in the [query-examples.md](resources/client-graphql/query-examples.md) file 
and mutations in the  [mutation-examples.md](resources/client-graphql/mutation-examples.md) files 
