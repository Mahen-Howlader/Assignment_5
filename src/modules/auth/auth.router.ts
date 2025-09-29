import { Router } from "express";
import { AuthController } from "./auth.controller";

const roauthRouteruter = Router(); 

roauthRouteruter.post("/login", AuthController.credentialsLogin);
roauthRouteruter.post("/create", AuthController.registerUser)

export default roauthRouteruter;