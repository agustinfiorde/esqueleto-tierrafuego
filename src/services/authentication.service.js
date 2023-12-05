import jwt from 'jsonwebtoken';
import ApiError from './../errors/api.error.js';
import { UserService } from './user.service.js';

/**
 * Algo asdasdasd asdas dasdas das dasd
 * 
 * @param {string} email - La dirección de correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise} - Una promesa que resuelve a algún resultado.
 */
export const authentication = async (email, password) => {
    try {
        const result = await UserService.findUserByEmailAndPassword(email, password);
        //DTO
        if (!result) throw new ApiError(500, "No se encontro nada en la DB");
        if (!result.isActive) throw new ApiError(401, "Confirmá tu cuenta par seguir :O 🎤");
        const token = jwt.sign(result, process.env.JWT_KEY, { expiresIn: "1h" });
        return token;
    } catch (error) {
        throw error
    }
}