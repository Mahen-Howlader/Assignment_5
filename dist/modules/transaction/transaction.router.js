"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("./transaction.controller");
const auth_1 = require("../../middlewares/auth");
const user_interface_1 = require("../user/user.interface");
const transactionsRouters = (0, express_1.Router)();
transactionsRouters.get("/me", (0, auth_1.auth)(user_interface_1.Role.USER, user_interface_1.Role.AGENT), transaction_controller_1.transactionsController.transactionsMe);
// AGENT 
transactionsRouters.get("/commission", (0, auth_1.auth)(user_interface_1.Role.AGENT), transaction_controller_1.transactionsController.commissionTRX);
// ADMIN 
transactionsRouters.get("/", (0, auth_1.auth)(user_interface_1.Role.ADMIN), transaction_controller_1.transactionsController.getAllTransactions);
transactionsRouters.get("/:id", (0, auth_1.auth)(user_interface_1.Role.ADMIN), transaction_controller_1.transactionsController.specificTransaction);
exports.default = transactionsRouters;
