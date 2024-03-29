import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../database/db.js';
import authService from '../services/authService.js';

export async function register(req, res) {
    const user = req.body;
    await authService.register(user);
    res.sendStatus(201);
}

export async function logIn(req, res) {
    const user = await authService.logIn(req.body);
    res.send(user);
}

export async function logOut(req, res) {
    const userId = res.locals.userId;
    await authService.logOut(userId);
    res.sendStatus(204);
}