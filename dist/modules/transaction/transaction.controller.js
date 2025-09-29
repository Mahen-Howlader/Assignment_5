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
exports.transactionsController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const SendResponse_1 = require("../../utils/SendResponse");
const transaction_server_1 = require("./transaction.server");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const transactionsMe = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield transaction_server_1.transactionService.transactionsMe(req);
    (0, SendResponse_1.sendResponse)(res, {
        data: data,
        statusCode: http_status_codes_1.default.OK,
        message: "User Transactions all data get successful",
        success: true
    });
}));
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_server_1.transactionService.getAllTransactions();
    (0, SendResponse_1.sendResponse)(res, {
        data: transactions,
        message: "Transaction history fetched successfully",
        success: true,
        statusCode: http_status_codes_1.default.OK
    });
});
const specificTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield transaction_server_1.transactionService.specificTransaction(id);
    (0, SendResponse_1.sendResponse)(res, {
        data: data,
        statusCode: http_status_codes_1.default.OK,
        message: "Specific Transactions a successful",
        success: true
    });
});
const commissionTRX = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user._id;
    const data = yield transaction_server_1.transactionService.commissionTRX(id);
    (0, SendResponse_1.sendResponse)(res, {
        data: data,
        statusCode: http_status_codes_1.default.OK,
        message: "Specific Transactions a successful",
        success: true
    });
});
exports.transactionsController = {
    transactionsMe,
    getAllTransactions,
    specificTransaction,
    commissionTRX
};
