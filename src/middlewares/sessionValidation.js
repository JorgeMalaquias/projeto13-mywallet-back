import db from '../database/db.js';

export default async function sessionValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) throw ({ type: 'unauthorized', message: 'Invalid Credentials' });

    const session = await db.collection('sessions').findOne({ token: token });

    if (!session) {
        throw ({ type: 'unauthorized', message: 'Invalid Credentials' });
    } else {
        res.locals.userId = session.userId;
        next();
    }
}

