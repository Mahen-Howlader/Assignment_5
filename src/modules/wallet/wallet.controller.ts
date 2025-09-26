import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { walletService } from "./wallet.service";
import { sendResponse } from "../../utils/SendResponse";
import AppError from "../../error/AppError";

const walletDeposite = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const token = req.headers.authorization;
    if (!token) {
        throw new AppError(401, "Authorization token missing");
    }

    const deposit = await walletService.deposit(payload);
    sendResponse(res, {
        data: deposit,
        statusCode: 201,
        message: "Deposit success full",
        success: true
    })
});


export const walletController = {
    walletDeposite
}