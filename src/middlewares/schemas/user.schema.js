import Joi from "@hapi/joi";
import { Schemas } from "./schema.js";

export const schemaUser = {
    create: Joi.object().keys({
        name: Schemas.String,
        email: Schemas.Email,
        password: Schemas.Password,
    }),

    update: Joi.object().keys({
        id: Schemas.Id,
        email: Schemas.Email,
        password: Schemas.Password,
    }),
};