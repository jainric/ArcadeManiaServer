import { IUserInfo } from "./user.types";
import mongoose from 'mongoose';
import { IGameUserEntity } from "./common.types";

/**
 * Leaderboard Entity.
 */
export interface ILeaderboard extends IGameUserEntity {
    score: number;
}

/**
 * Leaderboard Game Data Entity.
 */
export interface ILeaderboardGameData extends IUserInfo {
    gameId: number,
    score: number;
}
