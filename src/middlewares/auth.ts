import { NextFunction, Request, Response } from "express";
import AppError from "../error/AppError";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";

export const auth = (role: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) throw new AppError(401, "Authorization not found");

    const isVerified = jwt.verify(token, config.jwt.jwt_access_secret!) as JwtPayload;

    const isUserExsit = await User.findOne({ email: isVerified.email });
    if (!isUserExsit) throw new AppError(404, "User not Found");

    if (!role.includes(isVerified.role))
        throw new AppError(401, "You can't not access this recourse");

    req.user = isUserExsit;

    next();

};
