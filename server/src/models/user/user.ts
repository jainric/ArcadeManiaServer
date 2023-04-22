import mongoose from 'mongoose';
import { IUser } from '../../types/models/user.types';
import { hashPassword, comparePassword } from '../../config/crypto';
import { isValidEmail, isValidPassword } from '../../config/validators';

// Schema options to include id field & add timestamps while creation and updation.
const schemaOptions = {
    timestamps: {
        createdAt: 'createdDate',
        updatedAt: 'lastModifiedDate'
    },
    toJSON: {
        virtuals: true,
        transform (doc: mongoose.Document, ret: IUser) {
            delete ret.password;
            return ret;
        }
    },
    toObject: {
        virtuals: true
    }
};

// User Schema
const schema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value: string) {
            if (!isValidEmail(value)) {
                throw new Error('Invalid email.');
            }
        },
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        private: true,
        validate(value: string) {
            if (!isValidPassword(value)) {
                throw new Error('Password must be on length 8 and contain at least one uppercase, one lowercase, one special character and one number');
            }
        }
    }
}, schemaOptions);

schema.pre('save', async function (next) {
    // Encrypting the password on change
    if (this.isModified('password')) {
        this.password = await hashPassword(this.password);
    }

    return next();
})

schema.methods.comparePassword = async function (password: string) {
    return comparePassword(this.password, password);
};

/**
 * @typedef User
 */
export const User = mongoose.model<IUser>('User', schema);