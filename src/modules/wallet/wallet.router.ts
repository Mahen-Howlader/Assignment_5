import { Router } from "express";
import { walletController } from "./wallet.controller";

const walletRouter = Router();


walletRouter.post("/deposit", walletController.walletDeposite)


export default walletRouter;