export const USERS = `
query users {
    users {
        id
        role
        pinCode
        organizationId
    }
}`;

export const USER_BY_ID = `
query userById($id: ID!) {
    userById(id: $id) {
        id
        role
        pinCode
        organizationId
    }
}`;

export const CREATE_USER = `
mutation createUser($role: UserRole!, $pinCode: String!) {
    createUser(role: $role, pinCode: $pinCode) {
        id
        role
        pinCode
        organizationId
    }
}`;

export const UPDATE_USER = `
mutation updateUser($id:ID!, $role: UserRole!, $pinCode: String!) {
    updateUser(id:$id, role: $role, pinCode: $pinCode) {
        id
        role
        pinCode
        organizationId
    }
}`;
