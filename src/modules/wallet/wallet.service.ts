import { Request, Response } from "express";
import { sendResponse } from "../../utils/SendResponse";
import { IWallet } from "./wallet.interface";
import { Wallet } from "./wallet.model";
import { transaction } from "../transaction/transaction.model";
import AppError from "../../error/AppError";
import { number } from "zod";
import { Types } from "mongoose";
import { User } from "../user/user.model";
import { Commission } from "../commission/commission.model";

const deposit = async (payload: IWallet, res: Response, req: Request, userId: string) => {
    const { balance } = payload;
    const id = userId;

    if (!balance || balance <= 0) {
        return sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Deposit amount must be greater than 0",
            data: balance
        });
    }

    // Wallet find or create
    let wallet = await Wallet.findOne({ user: id });
    if (!wallet) wallet = await Wallet.create({ user: id, balance: 0 });

    const prevBalance = wallet.balance;
    wallet.balance += balance;
    await wallet.save();

    // Transaction log
    const tx = await transaction.create({
        from: id,
        type: "deposit",
        balance: balance,
        status: "completed",
        narrative: `Deposit ${balance} BDT to wallet`,
        prevBalance,
        newBalance: wallet.balance
    });
    return { wallet, transaction: tx };
};

const withdrawMoney = async (userId: string, amount: number) => {
    if (!amount || amount <= 0) {
        throw new AppError(400, "Withdraw amount must be greater than 0");
    }

    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) throw new AppError(404, "Wallet not found");
    if (wallet.balance < amount) throw new AppError(400, "Insufficient balance");

    const prevBalance = wallet.balance;
    wallet.balance -= amount;
    const newBalance = wallet.balance;

    await wallet.save();

    const tx = await transaction.create([
        {
            from: userId,
            type: "withdraw",
            balance: amount,
            prevBalance,
            newBalance,
            status: "completed",
            narrative: `Withdraw ${amount} from wallet`,
        }
    ]);

    return { withdraw: amount, prevBalance, newBalance, tx };
};

const send = async (senderId: string, recipientId: string, amount: number) => {
    if (!amount || amount <= 0) throw new AppError(400, "Send amount must be greater than 0");
    if (!recipientId) throw new AppError(400, "Recipient ID required");
    const senderObjectId = new Types.ObjectId(senderId);
    const recipientObjectId = new Types.ObjectId(recipientId);

    const senderWallet = await Wallet.findOne({ user: senderObjectId });
    if (!senderWallet || senderWallet.balance < amount)
        throw new AppError(400, "Insufficient balance");

    let recipientWallet = await Wallet.findOne({ user: recipientObjectId });
    if (!recipientWallet) {
        throw new AppError(404, "Waller Not Found")
    }

    const senderPrev = senderWallet.balance;
    const recipientPrev = recipientWallet.balance;

    senderWallet.balance -= amount;
    recipientWallet.balance += amount;

    await senderWallet.save();
    await recipientWallet.save();

    const tx = await transaction.create({
        user: senderObjectId,
        type: "send",
        balance: amount,
        prevBalance: senderPrev,
        newBalance: senderWallet.balance,
        status: "completed",
        narrative: `Sent ${amount} BDT to user ${recipientId}`,
        from: senderObjectId,
        to: recipientObjectId
    });

    return { sendMoney: amount, senderWallet, recipientWallet, transaction: tx };
};

const wallets = async (userId: string) => {
    if (!Types.ObjectId.isValid(userId)) {
        throw new AppError(400, "Invalid user ID");
    }

    const wallet = await Wallet.findOne({ user: userId }).populate("user", "name email role");

    if (!wallet) {
        throw new AppError(404, "Wallet not found");
    }
    return wallet;
};

const cashIn = async (agentId: string, userId: string, amount: number) => {
    if (!amount || amount <= 0) throw new AppError(400, "Amount must be greater than 0");

    const agentWallet = await Wallet.findOne({ user: agentId });
    if (!agentWallet) throw new AppError(404, "Agent wallet not found");

    if (agentWallet.balance < amount) {
        throw new AppError(400, "Agent has insufficient balance for cash-in");
    }

    const userWallet = await Wallet.findOne({ user: userId });
    if (!userWallet) throw new AppError(404, "User wallet not found");

    const prevBalance = userWallet.balance;

    userWallet.balance += amount;
    const newBalance = userWallet.balance;
    await userWallet.save();

    agentWallet.balance -= amount;
    await agentWallet.save();

    await transaction.create({
        from: agentId,
        to: userId,
        type: "cash-in",
        balance: amount,
        prevBalance,
        newBalance,
        status: "success",
        narrative: `Agent ${agentId} added ${amount} to user ${userId}`,
    });

    const commission = amount * 0.02;
    await Commission.create({
        agent: agentId,
        type: "cash-in",
        commission,
        amount,
    });

    agentWallet.balance += commission;
    await agentWallet.save();

    return {
        message: "Cash-in successful",
        cashInAmount: amount,
        commissionEarned: commission,
        userBalance: userWallet.balance,
        agentBalance: agentWallet.balance,
    };
};

const cashOut = async (agentId: string, userId: string, amount: number) => {
    if (!amount || amount <= 0) throw new AppError(400, "Amount must be greater than 0");

    const agentUser = await User.findById(agentId);
    if (!agentUser) throw new AppError(404, "Agent not found");
    if (agentUser.role.toString() !== "AGENT") {
        throw new AppError(403, "Only agents can perform cash-out");
    }

    const userWallet = await Wallet.findOne({ user: userId });
    if (!userWallet) throw new AppError(404, "User wallet not found");
    if (userWallet.balance < amount) throw new AppError(400, "Insufficient balance");

    const prevBalance = userWallet.balance;
    userWallet.balance -= amount;
    const newBalance = userWallet.balance;
    await userWallet.save();

    const agentWallet = await Wallet.findOne({ user: agentId });
    if (!agentWallet) throw new AppError(404, "Agent wallet not found");

    const commission = amount * 0.015;

    agentWallet.balance += amount + commission;
    await agentWallet.save();

    await transaction.create({
        from: userId,
        to: agentId,
        type: "cash-out",
        balance: amount,
        prevBalance,
        newBalance,
        status: "success",
        narrative: `Agent ${agentId} withdrew ${amount} from user ${userId}`,
    });

    await Commission.create({
        agent: agentId,
        type: "cash-out",
        commission,
        amount,
    });

    return {
        message: "Cash-out successful",
        userBalance: userWallet.balance,
        cashOutAmount: amount,
        commissionEarned: commission,
        total: amount + commission,
    };
};




export const walletService = {
    deposit,
    withdrawMoney,
    send,
    wallets,
    cashIn,
    cashOut
};