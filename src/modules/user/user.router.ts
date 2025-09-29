import { Router } from "express";
import { UserController } from "./user.controller";
import { Role } from "./user.interface";
import { auth } from './../../middlewares/auth';

const userRouter = Router();

userRouter.get("/me", auth(Role.ADMIN, Role.AGENT, Role.USER), UserController.getMe);
userRouter.get("/", auth(Role.ADMIN), UserController.getAllUsers);
userRouter.get("/agent", auth(Role.ADMIN), UserController.getAllAgents);
userRouter.get("/wallets", auth(Role.ADMIN), UserController.getAllWallets);

// ADMIN 
userRouter.patch("/block/:id", auth(Role.ADMIN), UserController.toggleUserWallet);
userRouter.patch("/agent/:id", auth(Role.ADMIN), UserController.toggleAgentStatus)


export default userRouter;