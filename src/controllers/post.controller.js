import { successMessages } from "./responses.message.js";

const getAll = (req, res, next) => {
    res.status(200).json("Hola desde getAll de Posteo Controller");
}

const createPost = (req, res, next) => {
    try {
        //llamada al service
        res.status(200).json({ message: successMessages.CREATED });
    } catch (error) {
        next(error);
    }
}
const findById = (req, res, next) => {
    res.status(200).json("Hola desde findById de Posteo Controller");
}
const findByUserId = (req, res, next) => {
    res.status(200).json("Hola desde findByUserId de Posteo Controller");
}

export { getAll, createPost, findById, findByUserId }