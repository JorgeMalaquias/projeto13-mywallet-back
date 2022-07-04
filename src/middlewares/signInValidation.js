import signInSchema from "../schemas/signInSchema.js";

export default function signInValidation(req, res, next) {
  const validation = signInSchema.validate(req.body);
  if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}