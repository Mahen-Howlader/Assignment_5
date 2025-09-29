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
exports.transactionService = void 0;
const transaction_model_1 = require("./transaction.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const commission_model_1 = require("../commission/commission.model");
const transactionsMe = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user)
        throw new AppError_1.default(404, "User Not Found");
    const result = yield transaction_model_1.transaction.find({ from: user === null || user === void 0 ? void 0 : user._id });
    return result;
});
const getAllTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_model_1.transaction.find().sort({ createdAt: -1 });
    return transactions;
});
const specificTransaction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_model_1.transaction.find({ from: id }).sort({ createdAt: -1 });
    return transactions;
});
const commissionTRX = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield commission_model_1.Commission.find({ agent: id }).sort({ createdAt: -1 });
    return transactions;
});
exports.transactionService = {
    transactionsMe,
    getAllTransactions,
    specificTransaction,
    commissionTRX
};
