import mongoose from "mongoose";

/**
 * Mongoose Entity.
 */
export interface IEntity {
  id: mongoose.ObjectId;
}

/**
 * User Entity
 */
export interface IUserEntity {
  userId: mongoose.ObjectId;
}
/**
 * Game User Entity.
 */
export interface IGameUserEntity extends IUserEntity {
  gameId: number;
}
