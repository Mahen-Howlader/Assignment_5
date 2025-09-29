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
exports.AuthController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const config_1 = __importDefault(require("../../config"));
const auth_service_1 = require("./auth.service");
const SendResponse_1 = require("../../utils/SendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const credentialsLogin = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const data = yield auth_service_1.authService.loginUser(payload);
    res.cookie("accessToken", data === null || data === void 0 ? void 0 : data.accessToken, {
        secure: config_1.default.node_env !== "development",
        httpOnly: true,
        sameSite: "lax"
    });
    res.cookie("refresToken", data === null || data === void 0 ? void 0 : data.refreshToken, {
        secure: config_1.default.node_env !== "development",
        httpOnly: true,
        sameSite: "lax"
    });
    (0, SendResponse_1.sendResponse)(res, {
        data: data,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Login Successfully",
        success: true
    });
}));
const registerUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.authService.retisterUser(req.body);
    (0, SendResponse_1.sendResponse)(res, {
        data: user,
        statusCode: http_status_codes_1.default.CREATED,
        message: "User create successful",
        success: true
    });
}));
exports.AuthController = {
    credentialsLogin, registerUser
};
