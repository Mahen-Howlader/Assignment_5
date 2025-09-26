import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/SendResponse";
import config from "../../config";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body);
    sendResponse(res, {
        data: user,
        statusCode: 201,
        message: "User create successful",
        success: true
    })
});

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const data = await UserService.loginUser(payload);

    res.cookie("accessToken", data?.accessToken,
        {
            secure: config.node_env !== "development",
            httpOnly: true,
            sameSite: "lax"
        }
    );
    res.cookie("refresToken", data?.refresToken,
        {
            secure: config.node_env !== "development",
            httpOnly: true,
            sameSite: "lax"
        }
    );

    res.send({
        success: true,
        message: "Login Successfully",
        data,
    });
});

export const UserController = {
    createUser,
    login
}