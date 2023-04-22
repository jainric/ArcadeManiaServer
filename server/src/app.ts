import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import mongoose from 'mongoose'
import logger from './config/logger';

import passport from 'passport';
import { applyPassportStrategies } from './middlewares/passport';
import * as dotenv from 'dotenv';
import session from 'express-session';
require('dotenv').config();
/*
 * Port to host the server
 */
const port = process.env.API_PORT;

// Database Connection
mongoose.connect('mongodb+srv://WebProject:WebProject123@web-database.ixwsyza.mongodb.net/ArcadeMania', (err) => {
    if (err) {
        logger.error(`Unable to connect to MongoDB database: ${err}`);
    }
});


/**
 * Creating express server
 */
const app = express();
dotenv.config();

// Express Server Middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

// Passport Setup
// app.use(session({ secret: 'SECRET' }));
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
  }));

applyPassportStrategies(passport);
app.use(passport.initialize());
app.use(passport.session());


// Custom routing
routes(app);

// Enable Server to listen on port
app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});