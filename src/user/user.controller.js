import { ApolloError } from 'apollo-server';
import { parseDatabaseErrors } from '../database';
import UserModel from './user.model.js';

export async function users(_, __, { organizationId }) {
    try {
        const result = await UserModel.find({ organizationId });
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function userById(_, { id }, { organizationId }) {
    try {
        const result = await UserModel.findOne({ id, organizationId });
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function createUser(_, create, { organizationId }) {
    try {
        const result = await UserModel.create({ ...create, organizationId });
        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}

export async function updateUser(_, update, { organizationId }) {
    try {
        const item = await userById(undefined, update, { organizationId });

        if (!item) {
            throw new ApolloError('User not found.');
        }

        const result = await UserModel.findOneAndUpdate(
            { id: update.id },
            update,
            { new: true }
        );

        return result;
    } catch (error) {
        parseDatabaseErrors(error);
    }
}
