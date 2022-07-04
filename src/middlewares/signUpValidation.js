import signUpSchema from "../schemas/signUpSchema.js";
import db from '../db.js';

export default function signUpValidation(req, res, next) {
  const validation = signUpSchema.validate(req.body);
  if (validation.error) {
    return res.sendStatus(422);
  }
  next();
}