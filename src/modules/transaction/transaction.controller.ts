import { send } from "process";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/SendResponse";
import { transactionService } from "./transaction.server";
import { NextFunction, Request, Response, response } from 'express';
import httpStatus from 'http-status-codes';

const transactionsMe = catchAsync(async (req: Request, res: Response) => {
    const data = await transactionService.transactionsMe(req);
    sendResponse(res, {
        data: data,
        statusCode: httpStatus.OK,
        message: "User Transactions all data get successful",
        success: true
    });
});

const getAllTransactions = async (req: Request, res: Response) => {
    const transactions = await transactionService.getAllTransactions();
    sendResponse(res, {
        data: transactions,
        message: "Transaction history fetched successfully",
        success: true,
        statusCode: httpStatus.OK
    })
};

const specificTransaction = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await transactionService.specificTransaction(id);
    sendResponse(res, {
        data: data,
        statusCode: httpStatus.OK,
        message: "Specific Transactions a successful",
        success: true
    });
};
export const transactionsController = {
    transactionsMe,
    getAllTransactions,
    specificTransaction
};
