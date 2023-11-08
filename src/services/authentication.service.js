import jwt from 'jsonwebtoken';
import ApiError from './../errors/api.error.js';
import { UserService } from './user.service.js';
import { PasswordUtil } from '../utils/password.util.js';

export const authentication = async (email, password) => {
    try {
        const result = await UserService.findUserByEmailAndPassword(email, password);
        if (!result) throw new ApiError(500, "No se encontro nada en la DB");
        if (!result.isActive) throw new ApiError(401, "Confirmá tu cuenta par seguir :O 🎤");
        const token = jwt.sign(result, process.env.JWT_KEY, { expiresIn: "1h" });
        return token;
    } catch (error) {
        throw error
    }
}