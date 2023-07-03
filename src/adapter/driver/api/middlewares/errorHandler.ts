import "express-async-errors";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "@domain/errors/validationError";
import { StatusCode } from "../utils/statusCode";

// ? "_next" parameter is not used but is needed for "express-async-errors" package
// ? Since whe are returning the response there is no use for it
// ? Removing it causes errors on every request
export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction, // eslint-disable-line
): Response {
    console.error(error);

    if (error instanceof ValidationError) {
        return res.status(StatusCode.unprocessableEntity).json({
            code: StatusCode.unprocessableEntity,
            name: error?.name,
            message: error?.message,
        });
    }

    return res.status(StatusCode.serverError).json({
        code: StatusCode.serverError,
        name: error?.name,
        message: error?.message,
    });
}
