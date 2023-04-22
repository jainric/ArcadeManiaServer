import winston from "winston";

/**
 * Global Logger for logging messages.
 */
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console()
    ]
});

export default logger;