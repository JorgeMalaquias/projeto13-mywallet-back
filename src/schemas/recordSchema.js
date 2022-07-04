import joi from "joi";

const recordSchema = joi.object({
    price: joi.number().required(),
    name: joi.string().required(),
    type: joi.string().required()
  });
  
  export default recordSchema;