import { startServer } from './server';
import { createDatabaseConnection, closeDatabaseConnection } from './database';

startServer();
createDatabaseConnection();

async function exitGracefully() {
    await closeDatabaseConnection();
    process.exit(0);
}

process
    // cleanup when process is terminated
    .on('SIGINT', exitGracefully)
    .on('SIGTERM', exitGracefully)
    // cleanup when process is restarted
    .on('SIGHUP', exitGracefully);
