import { createTestClient } from 'apollo-server-testing';
import { instantiateServer } from '../src/server';
import {
    createDatabaseConnection,
    closeDatabaseConnection,
    dropDatabase
} from '../src/database';
import {
    USERS,
    USER_BY_ID,
    CREATE_USER,
    UPDATE_USER
} from './fixture/queries.user';

const TEST_DB_CONNECTION_STRING = 'mongodb://localhost:27017/template-db-test';

let query = null;
const token = '5e7abd771f06a07014d872c0';
const organizationId = '5e7abc6792323e650e6c76e2';

describe('User:', function() {
    beforeAll(async function() {
        await createDatabaseConnection(TEST_DB_CONNECTION_STRING);
        const server = instantiateServer({
            context: () => ({
                token,
                organizationId
            })
        });
        ({ query } = createTestClient(server));
    });
    afterAll(async function() {
        await dropDatabase();
        await closeDatabaseConnection();
    });

    test('Create a user', async function() {
        const result = await query({
            query: CREATE_USER,
            variables: {
                role: 'ADMIN',
                pinCode: '0519'
            }
        });
        expect(result).toMatchSnapshot();
    });

    test('Update a user', async function() {
        const result = await query({
            query: UPDATE_USER,
            variables: {
                id: '1', // id from previously created user
                role: 'USER',
                pinCode: '7068'
            }
        });
        expect(result).toMatchSnapshot();
    });

    test('Fetch user by identifier', async function() {
        const result = await query({
            query: USER_BY_ID,
            variables: {
                id: '1' // id from previously created user
            }
        });

        expect(result).toMatchSnapshot();
    });

    test('Fetch users', async function() {
        const result = await query({
            query: USERS
        });

        expect(result).toMatchSnapshot();
    });
});
