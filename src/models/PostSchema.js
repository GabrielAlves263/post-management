import Joi from "joi";

const createPostSchema = Joi.object({
    title: Joi.string().max(50).required(),
    description: Joi.string().max(300).required(),
    type: Joi.string().valid("edital", "noticia", "divulgacao").required(),
    image: Joi.string().uri().optional()
}).options({ allowUnknown: false })

const updatePostSchema = Joi.object({
    title: Joi.string().max(50).optional(),
    description: Joi.string().max(300).optional(),
    type: Joi.string().valid("edital", "noticia", "divulgacao").optional(),
    image: Joi.string().uri().optional()
}).options({ allowUnknown: true })

const postResponseSchema = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
    title: Joi.string().max(50).required(),
    description: Joi.string().max(300).required(),
    type: Joi.string().max(10).required(),
    created_at: Joi.date().iso().required(),
    updated_at: Joi.date().iso().required(),
    image: Joi.string().uri().optional()
})

export { createPostSchema, postResponseSchema, updatePostSchema };

