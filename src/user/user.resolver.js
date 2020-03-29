import { users, userById, createUser, updateUser } from './user.controller';

export default {
    Query: {
        users,
        userById
    },
    Mutation: {
        createUser,
        updateUser
    }
};
