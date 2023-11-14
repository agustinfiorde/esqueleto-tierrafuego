import Joi from "@hapi/joi";
import { Schemas } from "./schema.js";

export const schemaUser = {
    create: Joi.object().keys({
        email: Schemas.Email,
        password: Schemas.Password,
    }),
    update: Joi.object().keys({
        email: Schemas.Email,
        password: Schemas.Password,
    }),
};