import { CustomResponse, CustomRequest } from "../types/config/express-types";
import * as userPreferencesService from "../services/user/user-preferences-service";
import { setResponse, setError } from "../utils/http-utils";
import { IUserPreference } from "../types/models/user-preferences.types";

/**
 * Updates the user preferences for specified user.
 *
 * @param req - Http Request with <IUserPreference> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const updateUserPreferences = async (
  req: CustomRequest<IUserPreference>,
  response: CustomResponse
) => {
  try {
    const userId = req.user.userId;
    const user = await userPreferencesService.updateUserPreferences(
      userId,
      req.body
    );
    setResponse(response, user);
  } catch (err) {
    setError(response, err);
  }
};

/**
 * Get the specified user preferences.
 *
 * @param req - Http Request with <any> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const getUserPreferences = async (
  req: CustomRequest<any>,
  response: CustomResponse
) => {
  try {
    const userId = req.user.userId;
    const user = await userPreferencesService.getUserPreferences(userId);
    setResponse(response, user);
  } catch (err) {
    setError(response, err);
  }
};
