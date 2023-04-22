import jwt from "jsonwebtoken";
import { authSecret } from "../config/auth-config";
import { CustomRequest } from '../types/config/express-types';

/**
 * Authorization Express Middleware to validate the request.
 *
 * @param req Request.
 * @param res Response.
 * @param next Next middleware to be executed.
 */
export const authRoute = (req: CustomRequest<any>, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, authSecret.secret, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
