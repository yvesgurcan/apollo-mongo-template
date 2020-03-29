import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import AutoIncrement from 'mongoose-sequence';
import devConfig from '../config/dev';

export function getConfig(property, defaultValue = '') {
    return devConfig[property] || defaultValue;
}

export function autoIncrement(schema, internalId) {
    if (process.env.TEST) {
        schema.plugin(AutoIncrement(mongoose), {
            id: internalId,
            inc_field: 'id'
        });
    }
}

export function castId() {
    if (process.env.TEST) {
        return String;
    }

    return ObjectId;
}

export function generateRandomNumber(desiredNumberLength) {
    if (process.env.TEST) {
        return '1'.repeat(desiredNumberLength);
    }

    const max = Number('9'.repeat(desiredNumberLength));
    const min = Number('1' + '0'.repeat(desiredNumberLength - 1));
    const number = Math.floor(Math.random() * (max - min) + min);
    return number;
}
