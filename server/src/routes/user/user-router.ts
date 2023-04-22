
import express from 'express';
import { authRoute } from '../../middlewares/authRoute';
import * as userController from "../../controllers/user-controller";

const router = express.Router();

// getUser Route
router.route('/user/getUser').get(authRoute, userController.getUser);

// UpdateProfile Route
router.route('/user/updateProfile').post(authRoute, userController.updateProfile);

export default router;