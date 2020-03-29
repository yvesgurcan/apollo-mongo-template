import { gql } from 'apollo-server';
import user from './user/user.schema.js';

const sharedSchema = gql`
    enum UserRole {
        USER
        ADMIN
    }
`;

export default [sharedSchema, user];
