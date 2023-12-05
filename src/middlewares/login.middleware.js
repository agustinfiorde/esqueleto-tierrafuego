import { schemaLogin } from "./schemas/login.schema.js";
import { schemaUser } from "./schemas/user.schema.js";

export const validateLogin = (req, res, next, route) => {
    const { error, value } = schemaLogin.login.validate(req.body, { abortEarly: false });

    switch (key) {
        case value:
            
            break;
    
        default:
            break;
    }

    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        res.status(422).json({ messages: errorMessages });
    } else {
        next();
    }
};