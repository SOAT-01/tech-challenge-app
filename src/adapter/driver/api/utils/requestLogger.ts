import { logger } from "express-winston";
import { format, transports } from "winston";

export const requestLogger = logger({
    colorize: true,
    meta: false,
    msg: "HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
    format: format.simple(),
    transports: [new transports.Console()],
});
