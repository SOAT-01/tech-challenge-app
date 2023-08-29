import "express-async-errors";
import { NextFunction, Request, Response } from "express";

import { StatusCode } from "utils/statusCode";
import { ResourceNotFoundError } from "utils/errors/resourceNotFoundError";
import { ValidationError } from "utils/errors/validationError";
import { BadError } from "utils/errors/badError";

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

    if (error instanceof ResourceNotFoundError) {
        return res.status(StatusCode.notFound).json({
            code: StatusCode.notFound,
            name: error?.name,
            message: error?.message,
        });
    }

    if (error instanceof BadError) {
        return res.status(StatusCode.badRequest).json({
            code: StatusCode.badRequest,
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
