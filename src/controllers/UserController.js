import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";
import { createUserSchema } from "../models/UserSchema.js";

export default class UserController {
    static register(req, res, next) {

        const { error } = createUserSchema.validate(req.body)

        if (error) {
            return res.status(400).send({ error: error.details[0].message })
        }

        const id = uuidv4()
        const email = req.body.email

        User.getByEmail(email, (error, result) => {
            if (error) { return res.status(500).send({ error: error }) }

            if (result.length > 0) {
                return res.status(409).send({ message: "User already registered" })
            }

            hash(req.body.password, 10, (error, hash) => {
                if (error) { return res.status(500).send({ error: error }) }


                User.register({ id, email, hash }, (error, result) => {
                    if (error) { return res.status(500).send({ error: error }) }

                    const response = {
                        message: 'User created successfully!',
                        user: {
                            id: id,
                            email: email
                        }
                    }

                    return res.status(201).send(response)
                })
            })

        })
    }
}