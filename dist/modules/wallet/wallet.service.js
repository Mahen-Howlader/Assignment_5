"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletService = void 0;
const SendResponse_1 = require("../../utils/SendResponse");
const wallet_model_1 = require("./wallet.model");
const transaction_model_1 = require("../transaction/transaction.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const mongoose_1 = require("mongoose");
const user_model_1 = require("../user/user.model");
const commission_model_1 = require("../commission/commission.model");
const deposit = (payload, res, req, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { balance } = payload;
    const id = userId;
    if (!balance || balance <= 0) {
        return (0, SendResponse_1.sendResponse)(res, {
            statusCode: 400,
            success: false,
            message: "Deposit amount must be greater than 0",
            data: balance
        });
    }
    // Wallet find or create
    let wallet = yield wallet_model_1.Wallet.findOne({ user: id });
    if (!wallet)
        wallet = yield wallet_model_1.Wallet.create({ user: id, balance: 0 });
    const prevBalance = wallet.balance;
    wallet.balance += balance;
    yield wallet.save();
    // Transaction log
    const tx = yield transaction_model_1.transaction.create({
        from: id,
        type: "deposit",
        balance: balance,
        status: "completed",
        narrative: `Deposit ${balance} BDT to wallet`,
        prevBalance,
        newBalance: wallet.balance
    });
    return { wallet, transaction: tx };
});
const withdrawMoney = (userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    if (!amount || amount <= 0) {
        throw new AppError_1.default(400, "Withdraw amount must be greater than 0");
    }
    const wallet = yield wallet_model_1.Wallet.findOne({ user: userId });
    if (!wallet)
        throw new AppError_1.default(404, "Wallet not found");
    if (wallet.balance < amount)
        throw new AppError_1.default(400, "Insufficient balance");
    const prevBalance = wallet.balance;
    wallet.balance -= amount;
    const newBalance = wallet.balance;
    yield wallet.save();
    const tx = yield transaction_model_1.transaction.create([
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
});
const send = (senderId, recipientId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    if (!amount || amount <= 0)
        throw new AppError_1.default(400, "Send amount must be greater than 0");
    if (!recipientId)
        throw new AppError_1.default(400, "Recipient ID required");
    const senderObjectId = new mongoose_1.Types.ObjectId(senderId);
    const recipientObjectId = new mongoose_1.Types.ObjectId(recipientId);
    const senderWallet = yield wallet_model_1.Wallet.findOne({ user: senderObjectId });
    if (!senderWallet || senderWallet.balance < amount)
        throw new AppError_1.default(400, "Insufficient balance");
    let recipientWallet = yield wallet_model_1.Wallet.findOne({ user: recipientObjectId });
    if (!recipientWallet) {
        throw new AppError_1.default(404, "Waller Not Found");
    }
    const senderPrev = senderWallet.balance;
    const recipientPrev = recipientWallet.balance;
    senderWallet.balance -= amount;
    recipientWallet.balance += amount;
    yield senderWallet.save();
    yield recipientWallet.save();
    const tx = yield transaction_model_1.transaction.create({
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
});
const wallets = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(userId)) {
        throw new AppError_1.default(400, "Invalid user ID");
    }
    const wallet = yield wallet_model_1.Wallet.findOne({ user: userId }).populate("user", "name email role");
    if (!wallet) {
        throw new AppError_1.default(404, "Wallet not found");
    }
    return wallet;
});
const cashIn = (agentId, userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    if (!amount || amount <= 0)
        throw new AppError_1.default(400, "Amount must be greater than 0");
    const agentWallet = yield wallet_model_1.Wallet.findOne({ user: agentId });
    if (!agentWallet)
        throw new AppError_1.default(404, "Agent wallet not found");
    if (agentWallet.balance < amount) {
        throw new AppError_1.default(400, "Agent has insufficient balance for cash-in");
    }
    const userWallet = yield wallet_model_1.Wallet.findOne({ user: userId });
    if (!userWallet)
        throw new AppError_1.default(404, "User wallet not found");
    const prevBalance = userWallet.balance;
    userWallet.balance += amount;
    const newBalance = userWallet.balance;
    yield userWallet.save();
    agentWallet.balance -= amount;
    yield agentWallet.save();
    yield transaction_model_1.transaction.create({
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
    yield commission_model_1.Commission.create({
        agent: agentId,
        type: "cash-in",
        commission,
        amount,
    });
    agentWallet.balance += commission;
    yield agentWallet.save();
    return {
        message: "Cash-in successful",
        cashInAmount: amount,
        commissionEarned: commission,
        userBalance: userWallet.balance,
        agentBalance: agentWallet.balance,
    };
});
const cashOut = (agentId, userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    if (!amount || amount <= 0)
        throw new AppError_1.default(400, "Amount must be greater than 0");
    const agentUser = yield user_model_1.User.findById(agentId);
    if (!agentUser)
        throw new AppError_1.default(404, "Agent not found");
    if (agentUser.role.toString() !== "AGENT") {
        throw new AppError_1.default(403, "Only agents can perform cash-out");
    }
    const userWallet = yield wallet_model_1.Wallet.findOne({ user: userId });
    if (!userWallet)
        throw new AppError_1.default(404, "User wallet not found");
    if (userWallet.balance < amount)
        throw new AppError_1.default(400, "Insufficient balance");
    const prevBalance = userWallet.balance;
    userWallet.balance -= amount;
    const newBalance = userWallet.balance;
    yield userWallet.save();
    const agentWallet = yield wallet_model_1.Wallet.findOne({ user: agentId });
    if (!agentWallet)
        throw new AppError_1.default(404, "Agent wallet not found");
    const commission = amount * 0.015;
    agentWallet.balance += amount + commission;
    yield agentWallet.save();
    yield transaction_model_1.transaction.create({
        from: userId,
        to: agentId,
        type: "cash-out",
        balance: amount,
        prevBalance,
        newBalance,
        status: "success",
        narrative: `Agent ${agentId} withdrew ${amount} from user ${userId}`,
    });
    yield commission_model_1.Commission.create({
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
});
exports.walletService = {
    deposit,
    withdrawMoney,
    send,
    wallets,
    cashIn,
    cashOut
};
