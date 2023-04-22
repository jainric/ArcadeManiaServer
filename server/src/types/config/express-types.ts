import { Request, Response } from "express";
import { IUserInfo } from "../models/user.types";

/**
 * Express Custom Request.
 */
export interface CustomRequest<T> extends Request {
    user?: IUserInfo
    body: T
}

/**
 * Express Custom Response.
 */
// tslint:disable-next-line:no-empty-interface
export interface CustomResponse extends Response {
}