import { IUser, ISignInUser } from "../../types/models/user.types";
import { User } from "../../models/index";
import { generateAccessToken, generateRefreshAccessToken } from "../../middlewares/jwt";
import passport from "passport";

/**
 * This method used to create a new user
 * @param user - user object of type IUser with the details of user
 */
export const createUser = async (user: IUser) => {
  const newUser =  await new User(user);
  await newUser.save();
  const aToken: string =  generateAccessToken(newUser.id);
  return {accessToken: aToken};
};

/**
 * This method is used to generate the accesstoken for the valid users
 * @param signInUser - user object with username and password
 */
export const loginUser = async (signInUser: ISignInUser) => {
  const user =  await User.findOne({
    username: signInUser.username
  });
    if (!user) {
      throw new Error("User Not found");
    }

    const passwordIsValid = await user.comparePassword(signInUser.password);
    if (!passwordIsValid) {
      throw new Error("Invalid Password");
    }
    else{
    const aToken: string =  generateAccessToken(user.id);

    const refreshToken = generateRefreshAccessToken(user.id);

    const res = {
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: aToken,
      refreshToken
    }
    return res;
  }
};

export const loginWithGoogle = async(profile: { email: string; displayName: string; }) => {
  try {
    const obj = await User.findOne({ email: profile.email });
    if (!obj) {
      const newUser = new User({
        email: profile.email,
        name: profile.displayName,
        username: profile.email,
        password: 'password'
      });
      await newUser.save();
      const token = generateAccessToken(newUser.id);
      const refreshToken = generateRefreshAccessToken(newUser.id);
      const res = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        accessToken: token,
        refreshToken
      }
      return res;
    } else {
      const token = generateAccessToken(obj.id);
    }
  } catch (err) {
    throw new Error(err);
  }
}
