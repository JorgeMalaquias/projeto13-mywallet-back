import express from "express";

export default async function sessionValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.sendStatus(401);
    try {
        const session = await db.collections("sessions").findOne({ token });

        if (!session) {
            return res.sendStatus(401);
        } else {
            res.locals.userId = session.userId;
            next();
        }
    }catch (error) {
        return res.status(500).send(error);
    }
    
}

