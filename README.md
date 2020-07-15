## Main dependencies

-   Node
-   GraphQL
-   Apollo Server
-   MongoDB
-   Mongoose
-   Jest

## Setup

You need `node`, `npm`, and `mongod` (see [instructions](https://docs.mongodb.com/manual/administration/install-community/)) installed globally on your machine in order to run this project.

All other dependencies are installed at the project level:

    npm i

## Development

Once you've installed all dependencies, type the following command to get started:

    npm start

-   An Apollo server will start listening to requests at `localhost:4001` and watch for file changes thanks to `nodemon`.
-   A MongoDB instance will run at `mongodb://localhost:27017` thanks to the Mongo deamon.

You can start the service on its own with `npm run start:service` or the database only at `npm run start:db`.

### API playground and documentation

Once the server is up and running, you will be able to explore the API at `http://localhost:4001/` thanks to [GraphQL Playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/)

Click on the `Schema` and `Docs` tabs on the right to find the API documentation.

Feel free to write [queries and mutations](https://graphql.org/learn/queries/) in the space on the left, see the results returned by the API, and take advantage of the auto-complete feature 😃.

Keep in mind that [GraphQL typically uses a single endpoint](https://graphql.org/learn/best-practices/#http) to handle all the requests.

## Design

This API is designed with its data at the center. For each data type, you will find the following structure in the source code:

```
    dataType
    ├── dataType.controller.js
    ├── dataType.model.js
    ├── dataType.resolver.js
    ├── dataType.schema.js
```

### Schema

The [schema](https://graphql.org/learn/schema/) is a self-documenting script that visually represents the interface and data structure exposed for each data type. In each `*.schema.js` file, you will find the following elements:

-   A definition of the fields that constitute the data type.
-   How this data type can be queried and what the query returns (under the `Query` type).
-   How this data type can be mutated and what the mutation returns (under the `Mutation` type).

The fact that GraphQL is a [strongly typed query language](https://blog.logrocket.com/defining-types-for-your-graphql-api/) provides the same advantage as other strongly typed languages when it comes to developing (and discovering) the API.

Additionally, the ability to carefully choose which database fields are exposed for each data type minimizes the need to sanitize the input.

### Model

The model is the representation of this data type from the perspective of the database. [Mongoose](https://medium.com/chingu/an-overview-of-mongodb-mongoose-b980858a8994) allows us to go further into shaping our data and making sure that it stays tidy.

A couple of the features that help us handling data for this application are the following:

-   The ability to provide default values to fields allows to fill the gap between the fields that are not exposed by the API and yet necessary for the application.
-   The ability to impose tighter constraints on the data (for example, the length of a string) comes in very handy as well.
-   Even better, Mongoose plays a great role in making sure that we can write integration tests reliably without having to mock database behaviors.

### Resolver map

[Resolvers](https://www.apollographql.com/docs/graphql-tools/resolvers/) are a central piece of GraphQL. In this application, the resolver map of each data type (`*.resolver.js`) simply represents the connection between what we call the controller and the schema.

### Controller (the real resolvers)

You will find the business logic that relates to a particular data type in the controller. Typically, this is where the CRUD operations happen, including interactions with MongoDB.

The signature of each function (aka resolver) looks like this example:

```
    resolver(parent, arguments, context)
```

-   `parent` comes in play if the [client requests different types in a single query](https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-chains).
-   `arguments` is obviously the sanitized input that was provided by the client.
-   `context` is very useful for middleware but and to store the value of headers that came from the request.

The value returned by the function is essentially the object that forms the core of the response of the Apollo Server to the client.

## Configuration

Environment-specific variables can be found in the `config` folder at the root of the project.

The logic that relates to the configuration of the API can be found in the various files at the root of the source folder. The following files are particularly noteworthy:

```
    src
    ├── resolvers.js
    ├── schema.js
    ├── database.js
    ├── server.js
    ├── index.js
    ├── util.js
```

-   The `resolvers` and `schema` files combine together the schema and resolvers of all the data type. The schema file also contains types that are shared among the data types.
-   The `database` file contains functions to connect to and disconnect from the data store. It also contains a function to drop the database, which is particularly useful when testing or developing the API.
-   The `server` file contains the logic you need to get the Apollo server started.
-   The `index` file brings the server and the database together and start the whole API.
-   The `util` file contains miscellani functions that can be useful in different parts of the API.

In addition to the API configuration, this project also contains at its root several config files related to the tools that are used to develop it:

-   NPM: `package.json` and `package-lock.json`
-   Babel: `babel.config.js`
-   Jest: `jest.config.js`
-   Prettier: `prettier.config.js`
-   Git and GitHub: `.gitignore`, `_config.yml`, `.github`, `LICENSE`, `CNAME`

## Integration tests

    npm test

Running the tests will instantiate a separate Apollo Server and a database for test purposes. In order to pass a test, the output of the query must match the snapshot that was previously saved. To update snapshots:

    npm run test:update

Since MongoDB relies on unique identifiers to avoid collisions, tests that involve foreign keys would systematically fail (snapshots would never match). Therefore, the test database relies on traditional auto-incrementing identifiers instead. The production database still relies on unique identifiers.
