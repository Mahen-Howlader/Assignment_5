import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validaterequest";
import { createUserZodValidation } from "../user/user.validation";

const roauthRouteruter = Router(); 

roauthRouteruter.post("/login", AuthController.credentialsLogin);
roauthRouteruter.post("/create", validateRequest(createUserZodValidation), AuthController.registerUser)

export default roauthRouteruter;