import express from 'express';
import { authRoute } from '../../middlewares/authRoute';
import * as leaderboardController from "../../controllers/leaderboard-controller";

// Creating a new Router for Auth
const router = express.Router();

// Get Global Leaderboard Route
router.route('/leaderboard').get(leaderboardController.getLeaderboard);

// Get Game Leaderboard Route
router.route('/leaderboard/:id').get(leaderboardController.getLeaderboard);

// Save Game Scores
router.route('/leaderboard/:id').post(authRoute, leaderboardController.saveScore);

export default router;
