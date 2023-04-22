import { Strategy as GoogleStratergy } from "passport-google-oauth2";
import { User } from "../models/user/user";
import { PassportStatic } from "passport";
import passportenv from "../config/env-config";
import { CallbackError } from "mongoose";

/**
 * This method is used to apply the google stratergy to the login flow
 * @param passport PassportJS static instance.
 */
const applyGoogleStrategy = (passport: PassportStatic) => {
  passport.use(
    "google",
    new GoogleStratergy(
      {
        clientID: passportenv.GoogleClientId,
        clientSecret: passportenv.GoodleClientSecret,
        callbackURL: passportenv.GoogleCallBackURL,
        scope: ["email", "profile"],
        passReqToCallback: true,
      },
      (
        req: any,
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any
      ) => {
        User.findOne(
          {
            email: profile.email,
          },
          (err: CallbackError, user: any) => {
            if (err) {
              return done(null, false);
            } else if (user) {
              req.user = { userId: user._id };
              return done(null, user);
            } else {
              const newUser = new User({
                email: profile.email,
                name: profile.displayName,
                username: profile.email,
                password: "password",
              });
              newUser.save((error, savedUser) => {
                if (error) {
                  return done(null, false);
                } else {
                  req.user = { userId: user._id };
                  return done(null, savedUser);
                }
              });
            }
          }
        );
      }
    )
  );
};
/**
 * Adds all the custom strategies to the PassportJS instance.
 *
 * @param passport PassportJS static instance.
 */
export const applyPassportStrategies = (passport: PassportStatic) => {
  applyGoogleStrategy(passport);
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
