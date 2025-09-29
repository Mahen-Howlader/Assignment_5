import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import config from "../../config";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/SendResponse";
import httpStatus from 'http-status-codes';

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const data = await authService.loginUser(payload);

    res.cookie("accessToken", data?.accessToken,
        {
            secure: config.node_env !== "development",
            httpOnly: true,
            sameSite: "lax"
        }
    );
    res.cookie("refresToken", data?.refreshToken,
        {
            secure: config.node_env !== "development",
            httpOnly: true,
            sameSite: "lax"
        }
    );

    sendResponse(res, {
        data: data,
        statusCode: httpStatus.CREATED,
        message: "Login Successfully",
        success: true
    });
});

const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await authService.retisterUser(req.body);
    sendResponse(res, {
        data: user,
        statusCode: httpStatus.CREATED,
        message: "User create successful",
        success: true
    });
});


export const AuthController = {
    credentialsLogin, registerUser
}