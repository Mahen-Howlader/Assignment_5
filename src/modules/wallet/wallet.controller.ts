import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { walletService } from "./wallet.service";
import { sendResponse } from "../../utils/SendResponse";
import httpStatus from 'http-status-codes';

const walletDeposite = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const userId = req.user._id;
    const deposit = await walletService.deposit(payload, res, req, userId);
    sendResponse(res, {
        data: deposit,
        statusCode: 201,
        message: "Deposit success full",
        success: true
    });
});

const walletWithraw = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const { balance } = req.body;
    const result = await walletService.withdrawMoney(userId, balance);
    sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        message: "Withdraw successful",
        success: true
    });
});

const sendMoney = async (req: Request, res: Response, next: NextFunction) => {
    const senderId = req.user._id;
    const { recipientId, balance } = req.body;

    const result = await walletService.send(senderId, recipientId, balance);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Money sent successfully",
        data: result
    });
};

const myWallet = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user._id;
    const data = await walletService.wallets(id);

    sendResponse(res, {
        data,
        statusCode: httpStatus.OK,
        message: "Wallet successfull fetch",
        success: true
    })
};

const cashIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const { amount } = req.body;
    const agentId = req.user._id;

    const result = await walletService.cashIn(agentId, userId, amount);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: result.message,
        data: result,
    });
});

const cashOut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params?.id;
    const { amount } = req.body;
    const agentId = req.user._id;

    const result = await walletService.cashOut(agentId, userId, amount);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: result.message,
        data: result,
    });
});


export const walletController = {
    walletDeposite,
    walletWithraw,
    sendMoney,
    myWallet,
    cashIn,
    cashOut,
}