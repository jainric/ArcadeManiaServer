import mongoose from "mongoose";
import { IUserPreference } from "../../types/models/user-preferences.types";
import { UserPreference } from "../../models/user/user-preferences";

/**
 * Helper function to get or create user preferences.
 *
 * @param userId userId
 * @returns User Preference.
 */
const getOrCreateUserPreference = async (userId: mongoose.ObjectId) => {
  let userPreference = await UserPreference.findOne({
    userId,
  });
  if (!userPreference) {
    userPreference = new UserPreference({
      userId,
      recentlyPlayed: [],
      theme: "dark"
    });
    await userPreference.save();
  }
  return userPreference;
};

/**
 * Updates the user preferences for the given user id.
 *
 * @param userId - userId
 */
export const updateUserPreferences = async (
  userId: mongoose.ObjectId,
  userData: IUserPreference
) => {
  const userPreferences = await getOrCreateUserPreference(userId);
  userPreferences.theme = userData.theme;
  userPreferences.recentlyPlayed = userData.recentlyPlayed;
  return userPreferences.save();
};

/**
 * Get the user preferences for the given user id.
 *
 * @param userId userId
 */
export const getUserPreferences = async (userId: mongoose.ObjectId) => {
  const userPreference = await UserPreference.findOne({
    userId,
  });
  if (!userPreference) {
    const defaultPreferences: IUserPreference = {
      userId,
      recentlyPlayed: [],
      theme: "dark"
    }
    return defaultPreferences;
  }
  return userPreference;
};
