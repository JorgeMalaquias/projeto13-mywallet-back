import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../database/db.js';


async function register(user) {

    const passwordHash = bcrypt.hashSync(user.password, 10);
    await db.collection('users').insertOne({ ...user, password: passwordHash })

}

async function logIn({ email, password }) {

    const user = await db.collection('users').findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {

        const session = await db.collection('sessions').findOne({ userId: user._id });

        if (session) {
            await db.collection('sessions').deleteOne({ userId: user._id });
        }
        const token = uuid();

        await db.collection('sessions').insertOne({ token, userId: user._id });

        return token;
    }
    throw ({ type: 'unauthorized', message: 'Invalid Credentials' });
}

async function logOut(token) {
    await db.collection('sessions').deleteOne({ token: token })
}

const authService = {
    register,
    logIn,
    logOut
};

export default authService;

