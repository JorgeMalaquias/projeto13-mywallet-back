import { Router } from "express";
import signUpValidation from "../middlewares/signUpValidation.js";
import signInValidation from "../middlewares/signInValidation.js";
import { signUp } from "../controllers/authControllers.js";
import { signIn } from "../controllers/authControllers.js";

const authRouter = Router();
authRouter.post("/sign-up", signUpValidation, signUp);
authRouter.post("/sign-in", signInValidation, signIn);
export default authRouter;