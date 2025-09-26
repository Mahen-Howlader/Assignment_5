import { Router } from "express";
import userRouter from "../modules/user/user.router";
import walletRouter from "../modules/wallet/wallet.router";

export const router = Router();

const moduleRouter = [
    {
        path: "/user",
        router: userRouter
    },
    {
        path: "/wallets",
        router: walletRouter
    },
];

moduleRouter.forEach((route) => {
    router.use(route.path, route.router)
});