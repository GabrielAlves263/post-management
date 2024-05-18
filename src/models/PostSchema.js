import Joi from "joi";

const postSchema = Joi.object({
    title: Joi.string().max(50).required(),
    description: Joi.string().max(300).required(),
    type: Joi.string().max(10).required()
})

const postResponseSchema = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
    title: Joi.string().max(50).required(),
    description: Joi.string().max(300).required(),
    type: Joi.string().max(10).required(),
    created_at: Joi.date().iso().required(),
    updated_at: Joi.date().iso().required(),
})

export { postResponseSchema, postSchema };
