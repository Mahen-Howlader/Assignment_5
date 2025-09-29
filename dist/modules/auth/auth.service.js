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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = require("../user/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const wallet_model_1 = require("../wallet/wallet.model");
const config_1 = __importDefault(require("../../config"));
const jwt_1 = require("../../utils/jwt");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ email: payload.email });
    if (!isUserExist)
        throw new AppError_1.default(404, "User not found");
    const checkPassword = yield bcryptjs_1.default.compare(payload.password, isUserExist.password);
    if (!checkPassword)
        throw new AppError_1.default(403, "Password not matched");
    // Auto-create wallet
    let existingWallet = yield wallet_model_1.Wallet.findOne({ user: isUserExist._id });
    if (!existingWallet) {
        try {
            existingWallet = yield wallet_model_1.Wallet.create({ user: isUserExist._id, balance: Number(config_1.default.ammount || 50) });
        }
        catch (err) {
            console.error("Wallet creation failed:", err);
            throw new AppError_1.default(500, "Failed to create wallet");
        }
    }
    const jwtPayload = {
        email: isUserExist.email,
        role: isUserExist.role,
        id: isUserExist._id
    };
    const accessToken = (0, jwt_1.genaretToken)(jwtPayload, config_1.default.jwt.jwt_access_secret, config_1.default.jwt.jwt_expires_secret);
    const refreshToken = (0, jwt_1.genaretToken)(jwtPayload, config_1.default.jwt.jwt_refresh_secret, config_1.default.jwt.jwt_refresh_expires);
    return { accessToken, refreshToken };
});
const retisterUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, phone } = payload, rest = __rest(payload, ["email", "password", "phone"]);
    const existingUser = yield user_model_1.User.findOne({ phone: phone });
    if (existingUser) {
        throw new AppError_1.default(400, "PHone number already exist");
    }
    if (!email || !password) {
        throw new Error("Email and password must be provided");
    }
    const existing = yield user_model_1.User.findOne({ email });
    if (existing) {
        throw new Error("Email already exists");
    }
    const hashPassword = yield bcryptjs_1.default.hash(password, Number(process.env.BCRYPT_SALT_ROUND));
    const user = yield user_model_1.User.create(Object.assign({ email, password: hashPassword, phone }, rest));
    return user;
});
exports.authService = {
    loginUser,
    retisterUser
};
