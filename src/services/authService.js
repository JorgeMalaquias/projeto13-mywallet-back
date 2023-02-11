import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../database/db.js';
import authRepository from '../repositories/authRepository.js';


async function register(user) {
    const isThereAUser = await authRepository.findOneByEmail(user.email);
    if (isThereAUser !== null) {
        throw ({ type: 'conflict', message: 'The informed email is already been used!' });
    }
    const passwordHash = bcrypt.hashSync(user.password, 10);
    await authRepository.create({ ...user, password: passwordHash });
}

async function logIn({ email, password }) {
    const user = await authRepository.findOneByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {

        const session = await authRepository.findSessionByUserId(user._id);
        if (session) {
            await authRepository.deleteSessionByUserId(user._id);
        }
        const token = uuid();

        await authRepository.createSession(token, user._id);
        return { token, name: user.name };
    }
    throw ({ type: 'unauthorized', message: 'Invalid Credentials' });
}

async function logOut(userId) {
    await authRepository.deleteSessionByUserId(userId);
}

const authService = {
    register,
    logIn,
    logOut
};

export default authService;

