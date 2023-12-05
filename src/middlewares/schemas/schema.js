import Joi from "@hapi/joi";
import { ROLES } from "../../db/role.enum.js";

const messageString = {
    "any.string": "El campo es obligatorio",
    "string.min": "Como mínimo debería tener 2 caracteres",
    "string.max": "Se excedió de los 30 caracteres"
};

const messageDni = {
    "any.string": "El campo es obligatorio",
    "string.min": "Como mínimo debería tener 8 caracteres",
    "string.max": "Como máximo debería tener 8 caracteres"
};

const messageEmail = {
    "any.string": "El campo email es obligatorio",
    "string.min": "Como mínimo el campo email debería tener 2 caracteres",
    "string.max": "Como máximo el campo email debería tener 30 caracteres"
};

const messagePassword = {
    "any.string": "El campo es obligatorio",
    "string.min": "Como mínimo el campo password debería tener 8 caracteres",
    "string.max": "Como máximo debería tener 16 caracteres"
};

const messageRole = {
    "any.string": "El campo es obligatorio",
    "string.min": "Tienes que seleccionar un Rol válido"
};

const messageGender = {
    "any.string": "El campo es obligatorio",
    "string.valid": "Tienes que seleccionar un Rol válido"
};

export const Schemas = {
    Id: Joi.string().min(35).max(36).required().messages({ "any.string": "Para la edición el id es obligatorio" }),
    String: Joi.string().min(2).max(30).required().messages(messageString),
    Email: Joi.string().min(2).max(30).required().email().messages(messageEmail),
    Dni: Joi.string().min(8).max(8).required().messages(messageDni),
    Password: Joi.string().min(8).max(16).required().messages(messagePassword),
    PasswordLogin: Joi.string().min(8).max(16).required().messages(messagePassword),
    Role: Joi.string().valid(...Object.values(ROLES)).required(),
};
