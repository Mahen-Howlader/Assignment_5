import { Router } from "express";
import { transactionsController } from "./transaction.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../user/user.interface";

const transactionsRouters = Router();



transactionsRouters.get("/me", auth(Role.USER, Role.AGENT), transactionsController.transactionsMe)
transactionsRouters.get("/", auth(Role.ADMIN), transactionsController.getAllTransactions);
transactionsRouters.get("/:id", auth(Role.ADMIN), transactionsController.specificTransaction);

export default transactionsRouters;