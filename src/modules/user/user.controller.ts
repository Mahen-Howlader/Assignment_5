import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/SendResponse";
import config from "../../config";
import httpStatus from "http-status-codes";
import AppError from "../../error/AppError";


const getMe = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?._id; // ✅ auth থেকে ইউজার আইডি নেওয়া
    if (!userId) {
        throw new AppError(401, "Unauthorized - user ID not found in token");
    }

    const user = await UserService.getUserById(userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile fetched successfully",
        data: user,
    });
});
const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserService.getAllUsers();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All users fetched successfully",
        data: users,
    });
});
const getAllAgents = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserService.getAllAgents();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All Agents fetched successfully",
        data: users,
    });
});
const getAllWallets = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserService.getAllWallets();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All getAllWallets fetched successfully",
        data: users,
    });
});
const toggleUserWallet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { block } = req.body;
    const userId = req.params.id;
    const result = await UserService.toggleUserWallet(userId, block);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: result.message,
        data: result,
    });
});

const toggleAgentStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) =>{
    const { approve } = req.body; 
    const agentId = req.params.id;
    const result = await UserService.toggleAgentStatus(agentId, approve);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: result.message,
        data: result,
    });
});

export const UserController = {
    getMe,
    getAllUsers,
    toggleUserWallet,
    toggleAgentStatus,
    getAllAgents,
    getAllWallets
}