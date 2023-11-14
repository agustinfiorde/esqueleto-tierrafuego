import ApiError from "../errors/api.error.js";
import { db } from "./../db/index.db.js";

const getAllUser = async () => {
    return await db.User.findAll();
}

const getUserByEmail = async (email) => {
    const result = await db.User.findOne(
        {
            where: { email },
        });
    if (!result) throw new ApiError(400, "no se encontro ningun usuario bajo ese email")
    return { dataValues } = result;
}

const createUser = async (user) => {
    return db.User.create(user)
}

export const UserRepository = {
    getAllUser,
    getUserByEmail,
    createUser,
};