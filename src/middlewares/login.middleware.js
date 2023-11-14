import { schemaLogin } from "./schemas/login.schema.js";

export const validateLogin = (req, res, next) => {
    const { error, value } = schemaLogin.login.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        res.status(422).json({ messages: errorMessages });
    } else {
        next();
    }
};