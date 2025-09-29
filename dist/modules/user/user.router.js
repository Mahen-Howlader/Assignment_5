"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const user_interface_1 = require("./user.interface");
const auth_1 = require("./../../middlewares/auth");
const userRouter = (0, express_1.Router)();
userRouter.get("/me", (0, auth_1.auth)(user_interface_1.Role.ADMIN, user_interface_1.Role.AGENT, user_interface_1.Role.USER), user_controller_1.UserController.getMe);
userRouter.get("/", (0, auth_1.auth)(user_interface_1.Role.ADMIN), user_controller_1.UserController.getAllUsers);
userRouter.get("/agent", (0, auth_1.auth)(user_interface_1.Role.ADMIN), user_controller_1.UserController.getAllAgents);
userRouter.get("/wallets", (0, auth_1.auth)(user_interface_1.Role.ADMIN), user_controller_1.UserController.getAllWallets);
// ADMIN 
userRouter.patch("/block/:id", (0, auth_1.auth)(user_interface_1.Role.ADMIN), user_controller_1.UserController.toggleUserWallet);
userRouter.patch("/agent/:id", (0, auth_1.auth)(user_interface_1.Role.ADMIN), user_controller_1.UserController.toggleAgentStatus);
exports.default = userRouter;
