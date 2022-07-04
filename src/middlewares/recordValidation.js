import recordSchema from "../schemas/recordSchema.js";

export default function recordValidation(req, res, next) {
  const validation = recordSchema.validate(req.body);
  if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}