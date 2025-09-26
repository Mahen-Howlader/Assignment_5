import { Router } from "express";
import { UserController } from "./user.controller";

const userRouter = Router();

userRouter.post("/create", UserController.createUser)
userRouter.post("/login", UserController.login)

export default userRouter;