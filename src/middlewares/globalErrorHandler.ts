import { NextFunction, Request, Response } from "express";
import { handlerDuplicateError } from "../helpers/handlerDuplicateError";
import { handlerCastError } from "../helpers/handlerCastError";
import { handleZodError } from "../helpers/handleZodError";
import { handleValidationError } from "../helpers/handleValidationError";
import AppError from "../error/AppError";
import config from "../config";


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = `Something went wrong: ${err.message}`;
    let errorSources: any = [];
    // duplicate error 
    if (err.code === 11000) {
        const simplifiedError = handlerDuplicateError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    // Object Id Error // Cast Error 
    else if (err.name === "CastError") {
        const simplifiedError = handlerCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    else if (err.name === "ZodError") {
        const simplifiedError = handleZodError(err);

        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (err.name === "ValidationError") {
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError.statusCode;
        errorSources = simplifiedError.errorSources;
        message = "ValidationError error occured";
    }
    else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        errorSources,
        err: config.node_env === "development" ? err : null,
        stack: config.node_env === "development" ? err.stack : null,
    });
};
