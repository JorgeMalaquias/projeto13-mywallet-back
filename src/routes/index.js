import { Router } from "express";

const router = Router();
router.use(authRouter);
router.use(recordsRouter);
export default router;