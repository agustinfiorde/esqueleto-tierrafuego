import { UserService } from "../services/user.service.js";

const getAll = (req, res, next) => {
    UserService.getAll()
        .then((result) => {
            res.status(200).json({ data: result });
        })
        .catch((error) => {
            next(error)
        });
};

const create = (req, res, next) => {
    UserService.createUser(req.body)
        .then((result) => {
            res.status(200).json({ data: result });
        })
        .catch((error) => {
            next(error)
        });
};

export const UserController = {
    getAll,
    create,
};
