import db from '../database/db.js';


async function create(userData) {
    await db.collection('users').insertOne(userData);
}
async function findOneByEmail(email) {
    const user = await db.collection('users').findOne({ email });
    return user;
}





// session repository
async function createSession(token, userId) {
    const newSession = await db.collection('sessions').insertOne({ token, userId });
}

async function findSessionByUserId(userId) {
    const session = await db.collection('sessions').findOne({ userId });
    return session;
}

async function deleteSessionByUserId(userId) {
    await db.collection('sessions').deleteOne({ userId });
}


const authRepository = {
    create,
    findOneByEmail,
    // session repository
    createSession,
    findSessionByUserId,
    deleteSessionByUserId
};

export default authRepository;
