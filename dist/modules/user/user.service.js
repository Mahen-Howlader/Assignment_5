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
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const wallet_model_1 = require("../wallet/wallet.model");
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId).select("-password");
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    return user;
});
const getAllUsers = () => {
    return user_model_1.User.find({ role: "USER" }).select("-password").lean();
};
const getAllAgents = () => {
    return user_model_1.User.find({ role: "AGENT" }).select("-password").lean();
};
const getAllWallets = () => {
    return wallet_model_1.Wallet.find();
};
const toggleUserWallet = (userId, block) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findOne({ user: userId });
    if (!wallet)
        throw new AppError_1.default(404, "User wallet not found");
    wallet.isBlocked = block;
    yield wallet.save();
    return { message: block ? "Wallet blocked" : "Wallet unblocked" };
});
const toggleAgentStatus = (agentId, approve) => __awaiter(void 0, void 0, void 0, function* () {
    const agent = yield user_model_1.User.findById(agentId);
    if (!agent)
        throw new AppError_1.default(404, "Agent not found");
    agent.isAgentApproved = approve;
    // Type assertion 
    agent.role = (approve ? "AGENT" : "USER");
    yield agent.save();
    return {
        message: approve
            ? "Agent approved and role set to AGENT"
            : "Agent suspended and role set to USER",
    };
});
exports.UserService = {
    getUserById,
    getAllUsers,
    toggleUserWallet,
    toggleAgentStatus,
    getAllAgents,
    getAllWallets
};
