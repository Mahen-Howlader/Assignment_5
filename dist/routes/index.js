"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_router_1 = __importDefault(require("../modules/user/user.router"));
const wallet_router_1 = __importDefault(require("../modules/wallet/wallet.router"));
const auth_router_1 = __importDefault(require("../modules/auth/auth.router"));
const transaction_router_1 = __importDefault(require("../modules/transaction/transaction.router"));
exports.router = (0, express_1.Router)();
const moduleRouter = [
    {
        path: "/users",
        router: user_router_1.default
    },
    {
        path: "/wallets",
        router: wallet_router_1.default
    },
    {
        path: "/auth",
        router: auth_router_1.default
    },
    {
        path: "/transactions",
        router: transaction_router_1.default
    },
];
moduleRouter.forEach((route) => {
    exports.router.use(route.path, route.router);
});
