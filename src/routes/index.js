import { Router } from "express";
import authRouter from './authRouter.js'
import recordsRouter from './recordsRouter.js'

const routes = Router();
routes.use(authRouter);
routes.use(recordsRouter);
export default routes;