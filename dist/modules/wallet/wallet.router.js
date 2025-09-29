"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wallet_controller_1 = require("./wallet.controller");
const auth_1 = require("../../middlewares/auth");
const user_interface_1 = require("../user/user.interface");
const walletRouter = (0, express_1.Router)();
// Agent User 
walletRouter.get("/me", (0, auth_1.auth)(user_interface_1.Role.AGENT), wallet_controller_1.walletController.myWallet);
// User 
walletRouter.post("/deposit", (0, auth_1.auth)(user_interface_1.Role.USER), wallet_controller_1.walletController.walletDeposite);
walletRouter.post("/send", (0, auth_1.auth)(user_interface_1.Role.USER), wallet_controller_1.walletController.sendMoney);
walletRouter.post("/withdraw", (0, auth_1.auth)(user_interface_1.Role.USER), wallet_controller_1.walletController.walletWithraw);
// Agent 
walletRouter.post("/cash-in/:id", (0, auth_1.auth)(user_interface_1.Role.AGENT), wallet_controller_1.walletController.cashIn);
walletRouter.post("/cash-out/:id", (0, auth_1.auth)(user_interface_1.Role.AGENT), wallet_controller_1.walletController.cashOut);
exports.default = walletRouter;
