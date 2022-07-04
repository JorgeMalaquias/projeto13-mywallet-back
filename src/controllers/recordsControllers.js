import express from "express";
import dayjs from "dayjs";

export async function gettingRecords(req, res) {
    const userId = res.locals.userId;
    try {
        const records = await db.collections("records").findMany({
            userId: userId
        }).toArray();
        res.send(records);
    } catch (error) {
        res.status(500).send(error);
    }
}
export async function newRecord(req, res) {
    const userId = res.locals.userId;
    try {
        await db.collections("records").insertOne({
            ...req.body, date:dayjs()
        }).toArray();
        res.send(dayjs());
    } catch (error) {
        res.status(500).send(error);
    }
}