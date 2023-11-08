import ApiError from '../errors/api.error.js';
import { UserRepository } from './../repositories/user.repository.js';
import { PasswordUtil } from './../utils/password.util.js';

const findUserByEmailAndPassword = async (email, password) => {
    const user = await UserRepository.getUserByEmail(email);
    if (!user) throw new ApiError(400, `Usuario no encontrado bajo el email ${email}`)
    const isPasswordValid = await PasswordUtil.comparePasswords(password, user.password);
    if (isPasswordValid) return user
}

const getAll = async () => {
    return await UserRepository.getAllUser();
}

const createUser = async (user) => {
    const hashedPassword = await PasswordUtil.hashPassword(user.password);
    user.password = hashedPassword;
    return await UserRepository.createUser(user);
}

export const UserService = {
    findUserByEmailAndPassword,
    getAll,
    createUser,
};