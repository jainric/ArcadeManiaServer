import express from "express";
import { authRoute } from "../../middlewares/authRoute";
import * as userPreferenceController from "../../controllers/user-preferences.controller";

const router = express.Router();

// Get User Preferences Route
router
  .route("/userpreferences")
  .get(authRoute, userPreferenceController.getUserPreferences);

// Update User Preferences Route
router
  .route("/userpreferences")
  .post(authRoute, userPreferenceController.updateUserPreferences);

export default router;
