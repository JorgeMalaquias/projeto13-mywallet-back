import signUpSchema from "../schemas/signUpSchema.js";
import db from '../db.js';

export default function signUpValidation(req, res, next) {
  const validation = signUpSchema.validate(req.body);
  if (validation.error) {
    return res.sendStatus(422);
  }
  const user = db.collection('users').findOne({name:req.body.name});
  if(user){
    return res.sendStatus(409);
  }
  const user2 = db.collection('users').findOne({email:req.body.email});
  if(user2){
    return res.sendStatus(409);
  }
  next();
}