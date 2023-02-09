import dayjs from "dayjs";
import db from '../database/db.js';

async function getRecords(userId) {

    const records = await db.collection("records").find({
        userId: userId
    }).toArray();

    return records;
}

export async function createRecord(userId, record) {
    await db.collection("records").insertOne({
        price: record.price,
        name: record.name,
        type: record.type,
        date: dayjs().format('DD/MM'),
        userId: userId
    })
}

const recordsService = {
    getRecords,
    createRecord
}

export default recordsService;