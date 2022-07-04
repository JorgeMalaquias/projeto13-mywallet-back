import express from "express";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import db from '../db.js';

export async function gettingRecords(req, res) {
    const userId = res.locals.userId;
    try {
        const records = await db.collection("records").find({
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
        await db.collection("records").insertOne({
            price: req.body.price,
            name: req.body.name,
            type: req.body.type,
            date: dayjs().format('DD/MM'),
            userId: userId
        })
        res.send('ok');
    } catch (error) {
        res.status(500).send(error);
    }
}