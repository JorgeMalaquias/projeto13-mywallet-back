import dayjs from "dayjs";
import db from '../database/db.js';
import recordsRepository from "../repositories/recordsRepository.js";

async function getRecords(userId) {

    const records = await recordsRepository.getRecords(userId);

    return records.toArray();
}

export async function createRecord(userId, record) {
    const recordRepository = {
        ...record,
        date: dayjs().format('DD/MM'),
        price: Number(record.price)
    }
    if (recordRepository.type === 'output') {
        recordRepository.price *= -1;
    }
    await recordsRepository.createRecord(userId, recordRepository);
}

const recordsService = {
    getRecords,
    createRecord
}

export default recordsService;