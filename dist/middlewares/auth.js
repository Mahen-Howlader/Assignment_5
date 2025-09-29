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
exports.auth = void 0;
const AppError_1 = __importDefault(require("../error/AppError"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const jwt_1 = require("../utils/jwt");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const auth = (...role) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new AppError_1.default(403, "No Token Recived");
        }
        const verifyedToken = (0, jwt_1.verifyToken)(accessToken, config_1.default.jwt.jwt_access_secret);
        const isUserExist = yield user_model_1.User.findOne({ email: verifyedToken.email });
        if (!isUserExist) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Email dose not exist");
        }
        ;
        if (!role.includes(verifyedToken.role))
            throw new AppError_1.default(401, "You can't not access this recourse");
        req.user = isUserExist;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.auth = auth;
