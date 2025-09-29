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
exports.UserController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const user_service_1 = require("./user.service");
const SendResponse_1 = require("../../utils/SendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const getMe = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id; // ✅ auth থেকে ইউজার আইডি নেওয়া
    if (!userId) {
        throw new AppError_1.default(401, "Unauthorized - user ID not found in token");
    }
    const user = yield user_service_1.UserService.getUserById(userId);
    (0, SendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "User profile fetched successfully",
        data: user,
    });
}));
const getAllUsers = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.UserService.getAllUsers();
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "All users fetched successfully",
        data: users,
    });
}));
const getAllAgents = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.UserService.getAllAgents();
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "All Agents fetched successfully",
        data: users,
    });
}));
const getAllWallets = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.UserService.getAllWallets();
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "All getAllWallets fetched successfully",
        data: users,
    });
}));
const toggleUserWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { block } = req.body;
    const userId = req.params.id;
    const result = yield user_service_1.UserService.toggleUserWallet(userId, block);
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: result.message,
        data: result,
    });
}));
const toggleAgentStatus = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { approve } = req.body;
    const agentId = req.params.id;
    const result = yield user_service_1.UserService.toggleAgentStatus(agentId, approve);
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: result.message,
        data: result,
    });
}));
exports.UserController = {
    getMe,
    getAllUsers,
    toggleUserWallet,
    toggleAgentStatus,
    getAllAgents,
    getAllWallets
};
