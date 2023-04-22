import { CustomResponse, CustomRequest } from '../types/config/express-types';
import * as favouritesService from '../services/favourite/favourite-service';
import { setResponse, setError } from '../utils/http-utils';
import { IFavourite } from '../types/models/features.types';
import { IGameUserEntity } from '../types/models/common.types';

/**
 * Gets User Favourites
 *
 * @param req - Http Request with <IFavourite> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
 export const getFavourites = async (req: CustomRequest<IFavourite>, response: CustomResponse) => {
    try {
        const userId = req.user.userId;
        const data = await favouritesService.getFavourites(userId);
        setResponse(response, data || []);
    } catch (err) {
        setError(response, err);
    }
}

/**
 * Helper function to update/delete the user favourite.
 *
 * @param req - Http Request with <IFavourite> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
const handleFavourite = async (req: CustomRequest<IFavourite>, response: CustomResponse, isFavourite: boolean) => {
    try {
        const gameId = parseInt(req.params.id, 10);
        const userId = req.user.userId;
        const data = await favouritesService.setFavourite(gameId, userId, isFavourite);
        let result: IGameUserEntity[] = [];
        if(data) result = [data];
        setResponse(response, result);
    } catch (err) {
        setError(response, err);
    }
}

/**
 * Sets the given game as user favourite.
 *
 * @param req - Http Request with <IFavourite> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const setFavourite = async (req: CustomRequest<IFavourite>, response: CustomResponse) => {
    handleFavourite(req, response, true);
}

/**
 * Deletes the given game from user favourite.
 *
 * @param req - Http Request with <IFavourite> as body
 * @param {CustomResponse} response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const resetFavourite = async (req: CustomRequest<IFavourite>, response: CustomResponse) => {
    handleFavourite(req, response, false);
}