import express from 'express';
import { authRoute } from '../../middlewares/authRoute';
import * as authController from "../../controllers/auth-controller";

import * as userController from "../../controllers/user-controller";
import passport from 'passport';

// Creating a new Router for Auth
const router = express.Router();

// Signup Route
router.route('/auth/signup').post(authController.createUser);

// Signin Route
router.route('/auth/signin').post(authController.loginUser);

// Fetch all users
router.route('/auth/getAllUsers').get(authController.getAllUsers);

// Delete a user
router.route('/auth/deleteUser/:emailId').delete(authController.deleteUser);

// Logout Route
router.get("/auth/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
      });
    res.redirect("/logoutsuccess");
})

// Google Signin Route
router. get('/auth/google', passport.authenticate('google', {scope:['email', 'profile']}));

router.get('/auth/google/callback', authController.authWithGoogleRoute, authController.triggerGoogleLoginResponse);

// getUser Route
router.route('/user/getUser').get(authRoute, userController.getUser);


// UpdateProfile Route
router.route('/user/updateProfile').post(authRoute,userController.updateProfile);



export default router;