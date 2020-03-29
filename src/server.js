import { ApolloServer } from 'apollo-server';
import { mergeSchemas } from 'graphql-tools';
import schemas from './schema.js';
import resolvers from './resolvers.js';
import { getConfig } from './util';

const schema = mergeSchemas({
    schemas,
    resolvers
});

export const serverConfig = {
    schema,
    context: ({ req }) => ({
        // token: req.headers['authorization'],
        organizationId: req.headers['organization-id']
    })
};

export const instantiateServer = (customConfig = {}) =>
    new ApolloServer({
        ...serverConfig,
        ...customConfig
    });

export async function startServer(server = instantiateServer(), customPort) {
    try {
        const port = customPort || getConfig('apolloPort');
        const { url } = await server.listen(port && { port });
        console.log(`🚀  Apollo Server ready at ${url}.`);
    } catch (error) {
        console.error('Could not start server.', error);
    }
}
