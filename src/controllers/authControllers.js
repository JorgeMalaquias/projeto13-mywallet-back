import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../db.js';

export async function signUp(req, res) {
    const user = req.body;
    const passwordHash = bcrypt.hashSync(user.password, 10);
    try {
        await db.collection('users').insertOne({ ...user, password: passwordHash })

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }


}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await db.collection('users').findOne({ email });

        if (user && bcrypt.compareSync(password, user.password)) {
            const session = await db.collection('sessions').findOne({ userId: user._id });

            if (session) {
                await db.collection('sessions').deleteOne({ userId: user._id });
            }
            const token = uuid();

            await db.collection('sessions').insertOne({ token, userId: user._id });

            res.send({ ...user, token });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        res.status(500).send(error);
    }


}

export async function loggingOut(req, res) {
    const { token } = req.params;

    try {

        await db.collection('sessions').deleteOne({ token:token})

        res.sendStatus(200)
    } catch (error) {
        res.status(500).send(error)
    }
}