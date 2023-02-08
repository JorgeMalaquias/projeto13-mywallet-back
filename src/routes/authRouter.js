import { Router } from "express";
import signUpValidation from "../middlewares/signUpValidation.js";
import signInValidation from "../middlewares/signInValidation.js";
import { register, logIn } from "../controllers/authControllers.js";
import { logOut } from "../controllers/authControllers.js";

const authRouter = Router();
authRouter.post("/sign-up", signUpValidation, register);
authRouter.post("/sign-in", signInValidation, logIn);
authRouter.delete('/log-out/:token', logOut);
export default authRouter;