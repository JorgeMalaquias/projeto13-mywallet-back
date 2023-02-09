import dayjs from "dayjs";
import db from '../database/db.js';
import recordsRepository from "../repositories/recordsRepository.js";

async function getRecords(userId) {

    const records = await recordsRepository.getRecords(userId);

    return records.toArray();
}

export async function createRecord(userId, record) {
    await recordsRepository.createRecord(userId, {
        ...record,
        date: dayjs().format('DD/MM')
    });
}

const recordsService = {
    getRecords,
    createRecord
}

export default recordsService;