import mongoose from 'mongoose';
import { IUserPreference } from '../../types/models/user-preferences.types';

// Schema options to include id field & add timestamps while creation and updation.
const schemaOptions = {
    timestamps: {
        createdAt: 'createdDate',
        updatedAt: 'lastModifiedDate'
    },
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
};

// User Preferences Schema
const schema = new mongoose.Schema<IUserPreference>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    theme: {
        type: String,
        trim: true,
        default: "dark"
    },
    recentlyPlayed: {
        type: [Number],
        default: []
    }
}, schemaOptions);

/**
 * @typedef UserPreference
 */
export const UserPreference = mongoose.model<IUserPreference>('UserPreference', schema);