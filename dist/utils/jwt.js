"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.genaretToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const genaretToken = (payload, secret, expiredIn) => {
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expiredIn });
    return token;
};
exports.genaretToken = genaretToken;
const verifyToken = (token, secret) => {
    const verifydToken = jsonwebtoken_1.default.verify(token, secret);
    return verifydToken;
};
exports.verifyToken = verifyToken;
