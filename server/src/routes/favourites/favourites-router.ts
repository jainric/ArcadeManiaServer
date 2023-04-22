import express from 'express';
import { authRoute } from '../../middlewares/authRoute';
import * as favouritesController from "../../controllers/favourites-controller";

// Creating a new Router for Favourites
const router = express.Router();

// Get Favourites
router.route('/favourites').get(authRoute, favouritesController.getFavourites);

// Set Favourites
router.route('/favourites/:id').post(authRoute, favouritesController.setFavourite);

// Reset Favourites
router.route('/favourites/:id').delete(authRoute, favouritesController.resetFavourite);


export default router;