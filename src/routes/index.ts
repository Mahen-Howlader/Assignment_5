import { Router } from "express";
import userRouter from "../modules/user/user.router";
import walletRouter from "../modules/wallet/wallet.router";
import roauthRouteruter from "../modules/auth/auth.router";
import transactionsRouters from "../modules/transaction/transaction.router";

export const router = Router();

const moduleRouter = [
    {
        path: "/users",
        router: userRouter
    },
    {
        path: "/wallets",
        router: walletRouter
    },
    {
        path: "/auth",
        router: roauthRouteruter
    },
    {
        path: "/transactions",
        router: transactionsRouters
    },
];

moduleRouter.forEach((route) => {
    router.use(route.path, route.router)
});