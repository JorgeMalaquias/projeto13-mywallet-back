import dayjs from "dayjs";
import db from '../database/db.js';
import recordsService from "../services/recordsService.js";

export async function gettingRecords(req, res) {
    const userId = res.locals.userId;
    const records = await recordsService.getRecords(userId);
    res.send(records);
}

export async function newRecord(req, res) {
    const userId = res.locals.userId;
    await recordsService.createRecord(userId, req.body);
    res.sendStatus(201);
}