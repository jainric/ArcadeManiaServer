import leaderboardRouter from './leaderboard/leaderboard-router';
import authRouter from './auth/auth-router';
import favouritesRouter from './favourites/favourites-router';
import userRouter from './user/user-router';
import { Express } from 'express'

import swaggerUI from 'swagger-ui-express';
import swaggerDoc from './swagger.json';
import userPreferencesRouter from './user/user-preferences-router';

const routes = (app: Express) => {
    // Signup Routes
    app.use('/api/v1', authRouter);

    // User Routes
    app.use('api/v1', userRouter);

    // Leaderboard Routes
    app.use('/api/v1', leaderboardRouter);

    // Favourites Routes
    app.use('/api/v1', favouritesRouter);

    // User Preferences Routes
    app.use('/api/v1', userPreferencesRouter);

    // Setting up swagger
    setupSwagger(app);

}

const setupSwagger = (app: Express) => {
    app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
    app.get('*', (req, res) => {
        res.redirect('/swagger');
    });
}

export default routes;
