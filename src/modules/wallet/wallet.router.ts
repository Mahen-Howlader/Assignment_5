import { Router } from "express";
import { walletController } from "./wallet.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../user/user.interface";

const walletRouter = Router();

// Agent User 
walletRouter.get("/me", auth(Role.AGENT), walletController.myWallet);
// User 
walletRouter.post("/deposit", auth(Role.USER), walletController.walletDeposite);
walletRouter.post("/send", auth(Role.USER), walletController.sendMoney);
walletRouter.post("/withdraw", auth(Role.USER), walletController.walletWithraw);
// Agent 
walletRouter.post("/cash-in/:id", auth(Role.AGENT), walletController.cashIn);
walletRouter.post("/cash-out/:id", auth(Role.AGENT), walletController.cashOut);

export default walletRouter;