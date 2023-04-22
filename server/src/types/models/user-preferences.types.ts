import mongoose from "mongoose";

/**
 * User Preference Entity.
 */
export interface IUserPreference {
    userId: mongoose.ObjectId;
    theme: "light" | "dark";
    recentlyPlayed: number[]
};