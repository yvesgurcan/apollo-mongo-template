import mongoose from 'mongoose';
import { ApolloError } from 'apollo-server';
import { getConfig } from './util';

// use the findAndModify() function from MongoDB under the hood instead of the findOneAndUpdate() function from Mongoose;
mongoose.set('useFindAndModify', false);

export async function createDatabaseConnection(customConnectionString) {
    const url = customConnectionString || getConfig('dbConnectionString');
    const connection = await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log(`🌿  Mongoose Database ready at ${url}.`);
    return connection;
}

export async function closeDatabaseConnection() {
    await mongoose.connection.close();
    console.log('👋  Disconnected from Mongoose Database.');
}

export async function dropDatabase() {
    await mongoose.connection.db.dropDatabase();
    console.log('💥  Mongoose Database dropped.');
}

export function parseDatabaseErrors(error) {
    if (error.errors) {
        const messages = Object.keys(error.errors).map(key => {
            const { message, path } = error.errors[key];
            return { message, path };
        });
        throw new ApolloError('ValidationError', messages);
    }

    if (error) {
        throw new ApolloError(error);
    }

    return null;
}
