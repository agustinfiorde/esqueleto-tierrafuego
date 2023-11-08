import { db } from "./../db/index.db.js";

const getAllUser = async () => {
    return await db.User.findAll();
}

const getUserByEmail = async (email) => {
    const { dataValues } = await db.User.findOne(
        {
            where: { email },
        });
    return dataValues;
}

const createUser = async (user) => {
    return db.User.create(user)
}

export const UserRepository = {
    getAllUser,
    getUserByEmail,
    createUser,
};