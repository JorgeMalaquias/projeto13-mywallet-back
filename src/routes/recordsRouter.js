import { Router } from "express";
import { gettingRecords } from "../controllers/recordsControllers.js";
import { newRecord } from "../controllers/recordsControllers.js";
import sessionValidation from '../middlewares/sessionValidation.js';

const recordsRouter = Router();
recordsRouter.get("/records", sessionValidation, gettingRecords);
recordsRouter.post("/records", sessionValidation, newRecord);
export default recordsRouter;

