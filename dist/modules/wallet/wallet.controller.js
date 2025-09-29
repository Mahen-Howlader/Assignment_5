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
exports.walletController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const wallet_service_1 = require("./wallet.service");
const SendResponse_1 = require("../../utils/SendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const walletDeposite = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const userId = req.user._id;
    const deposit = yield wallet_service_1.walletService.deposit(payload, res, req, userId);
    (0, SendResponse_1.sendResponse)(res, {
        data: deposit,
        statusCode: 201,
        message: "Deposit success full",
        success: true
    });
}));
const walletWithraw = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const { balance } = req.body;
    const result = yield wallet_service_1.walletService.withdrawMoney(userId, balance);
    (0, SendResponse_1.sendResponse)(res, {
        data: result,
        statusCode: http_status_codes_1.default.OK,
        message: "Withdraw successful",
        success: true
    });
}));
const sendMoney = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const senderId = req.user._id;
    const { recipientId, balance } = req.body;
    const result = yield wallet_service_1.walletService.send(senderId, recipientId, balance);
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Money sent successfully",
        data: result
    });
});
const myWallet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user._id;
    const data = yield wallet_service_1.walletService.wallets(id);
    (0, SendResponse_1.sendResponse)(res, {
        data,
        statusCode: http_status_codes_1.default.OK,
        message: "Wallet successfull fetch",
        success: true
    });
});
const cashIn = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { amount } = req.body;
    const agentId = req.user._id;
    const result = yield wallet_service_1.walletService.cashIn(agentId, userId, amount);
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: result.message,
        data: result,
    });
}));
const cashOut = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    const { amount } = req.body;
    const agentId = req.user._id;
    const result = yield wallet_service_1.walletService.cashOut(agentId, userId, amount);
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: result.message,
        data: result,
    });
}));
exports.walletController = {
    walletDeposite,
    walletWithraw,
    sendMoney,
    myWallet,
    cashIn,
    cashOut,
};
