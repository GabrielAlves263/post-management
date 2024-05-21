import Joi from "joi";

const createUserSchema = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
})

export { createUserSchema };

