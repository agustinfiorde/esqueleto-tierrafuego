import Joi from "@hapi/joi";
import { Schemas } from "./schema.js";

export const schemaLogin = {
    login: Joi.object().keys({
        email: Schemas.Email,
        password: Schemas.PasswordLogin,
    }),
};