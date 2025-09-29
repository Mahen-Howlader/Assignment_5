import { Request } from "express";
import { transaction } from "./transaction.model";
import AppError from "../../error/AppError";
import { Commission } from "../commission/commission.model";

const transactionsMe = async (req: Request) => {
    const user = req.user;
    if (!user) throw new AppError(404, "User Not Found")
    const result = await transaction.find({ from: user?._id });
    return result;
};

const getAllTransactions = async () => {
    const transactions = await transaction.find().sort({ createdAt: -1 });
    return transactions;
};
const specificTransaction = async (id : string) => {
    const transactions = await transaction.find({from : id}).sort({ createdAt: -1 });
    return transactions;
};
const commissionTRX = async (id : string) => {
    const transactions = await Commission.find({agent : id}).sort({ createdAt: -1 });
    return transactions;
};

export const transactionService = {
    transactionsMe,
    getAllTransactions,
    specificTransaction,
    commissionTRX
};