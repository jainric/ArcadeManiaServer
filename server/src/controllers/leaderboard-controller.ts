import { CustomResponse, CustomRequest } from '../types/config/express-types';
import * as leaderboardService from '../services/leaderboard/leaderboard-service';
import { setResponse, setError } from '../utils/http-utils';
import { isValid } from '../config/validators';
import { ILeaderboard } from '../types/models/leaderboard.types';
import logger from '../config/logger';

/**
 * Get the leaderboard for the given game.
 *
 * @param req - Http Request with any as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
 export const getLeaderboard = async (req: CustomRequest<any>, response: CustomResponse) => {
    try {
        const gameId = req.params.id;
        if(!isValid(gameId)) throw new Error('Invalid game id');
        const id = isValid(gameId) ? parseInt(gameId, 10) : 0;
        const data = await leaderboardService.getLeaderboard(id);
        setResponse(response, data);
    } catch (err) {
        setError(response, err);
    }
}

/**
 * Saves the score for the given game for the current user.
 *
 * @param req - Http Request with ILeaderboard as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const saveScore = async (req: CustomRequest<ILeaderboard>, response: CustomResponse) => {
    try {
        const gameId = req.params.id;
        if(!isValid(gameId)) throw new Error('Invalid game id');
        const userId = req.user.userId;
        const score = req.body.score;
        const data = await leaderboardService.saveScore(parseInt(gameId, 10), userId, score);
        setResponse(response, data);
    } catch (err) {
        logger.error(err.message);
        setError(response, err);
    }
}


