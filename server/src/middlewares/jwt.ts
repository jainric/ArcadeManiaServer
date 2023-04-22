import { authSecret } from "../config/auth-config";
import jwt from 'jsonwebtoken'

/**
 * Generates a JWT token with the given parameters.
 *
 * @param userId Parameters to be set in JWT payload.
 * @returns JWT token.
 */
export const generateAccessToken = (userId: number) => {
   return jwt.sign({ userId }, authSecret.secret, {
        expiresIn: 86400,
      });
}

/**
 * Generates a JWT refresh token with the given parameters.
 *
 * @param userId Parameters to be set in JWT payload.
 * @returns JWT token.
 */
export const generateRefreshAccessToken = (userId: number) => {
    return jwt.sign({ userId, type:"refresh"}, authSecret.secret, {
         expiresIn: 86400,
       });
 }