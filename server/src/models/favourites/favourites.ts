import mongoose from 'mongoose';
import { IFavourite } from '../../types/models/features.types';

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

// Favourites Schema
const schema = new mongoose.Schema<IFavourite>({
    gameId: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
}, schemaOptions);

/**
 * @typedef Favourites
 */
export const Favourites = mongoose.model<IFavourite>('Favourites', schema);