import jwt from 'jsonwebtoken';
import ApiError from '../errors/api.error.js';

export const actionsByRole = {
    ADMIN: ["create", "read", "update", "delete"],
    USER: ["read", "update"],
}

export const isUserOrAdmin = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) throw new Error("Acceso no autorizado, no enviaste Token")

    try {
        token = token.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_KEY);
        const user = decode;
        if (user.role == "USER" || user.role == "ADMIN") {
            next();
        } else {
            throw new Error("No eres user ni admin");
        }
    } catch (error) {
        throw error
    }
}

export const isUser = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) throw new Error("Acceso no autorizado, no enviaste Token")

    try {
        token = token.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_KEY);
        const user = decode;
        if (user.role == "USER") {
            next();
        } else {
            throw new Error("No eres user");
        }
    } catch (error) {
        throw error
    }
}

export const isAdmin = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        throw new ApiError(401, "Acceso no autorizado, no enviaste Token")
    }
    try {
        token = token.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_KEY);
        const user = decode;
        if (user.role == "ADMIN") {
            next();
        } else {
            throw new ApiError(401, "No eres admin");
        }
    } catch (error) {
        throw error
    }
}