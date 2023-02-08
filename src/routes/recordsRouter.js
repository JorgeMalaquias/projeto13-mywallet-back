import { Router } from "express";
import { gettingRecords, newRecord } from "../controllers/recordsControllers.js";
import sessionValidation from '../middlewares/sessionValidation.js';
import recordValidation from '../middlewares/recordValidation.js';

const recordsRouter = Router();
recordsRouter.get("/records", sessionValidation, gettingRecords);
recordsRouter.post("/records", sessionValidation, recordValidation, newRecord);
export default recordsRouter;

