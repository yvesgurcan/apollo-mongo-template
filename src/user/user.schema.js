import { gql } from 'apollo-server';

export const getFields = `
    id: ID
    createdAt: String
    updatedAt: String
    role: UserRole
    pinCode: String
    organizationId: ID
`;

export const createFields = `
    role: UserRole!
    pinCode: String!
`;

export const updateFields = `
    id: ID!
    role: UserRole
    pinCode: String
`;

export default gql`
    type User {
        ${getFields}
    }

    type Query {
        users: [User]
        userById(id: ID!): User
    }

    type Mutation {
        createUser(${createFields}): User
        updateUser(${updateFields}): User
    }
`;
