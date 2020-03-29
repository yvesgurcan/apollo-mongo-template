import mongoose from 'mongoose';
import { castId, autoIncrement, generateRandomNumber } from '../util';

export const schema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ['ADMIN', 'USER'],
            default: 'USER',
            required: [true, 'User role is required.']
        },
        pinCode: {
            type: String,
            default: () => generateRandomNumber(4),
            minlength: 4,
            maxlength: 4,
            required: [true, 'PIN code is required.']
        },
        organizationId: {
            type: castId(),
            required: [true, 'Organization identifier is required.']
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

schema.virtual('id').get(function() {
    return this._id.toHexString();
});

autoIncrement(schema, 'user_id');

export default mongoose.model('User', schema);
