import { NextFunction, Request, Response } from "express";
import AppError from "../error/AppError";
import config from "../config";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../utils/jwt";
import httpStatus from 'http-status-codes';

export const auth = (...role: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new AppError(403, "No Token Recived")
        }

        const verifyedToken = verifyToken(accessToken, config.jwt.jwt_access_secret!);
        const isUserExist = await User.findOne({ email: verifyedToken.email });
        if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "Email dose not exist");
        };

        if (!role.includes(verifyedToken.role))
            throw new AppError(401, "You can't not access this recourse");

        req.user = isUserExist;

        next();
    } catch (error) {
        next(error);
    }
};
