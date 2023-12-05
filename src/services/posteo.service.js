import { getAllUser } from "../repositories/user.repository.js";

/**
 * Funcionalidad provisoria para testear JWT
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {Object} User
 */
const findUserByEmailAndPassword = (email, password) => {
    //Va ir a la DB y lo va a buscar
    return {
        name: 'Jonatan',
        email,
        password,
        role: 'USER',
        isActive: true
    };
}

const getAll = () => {
    return getAllUser();
}

export { findUserByEmailAndPassword, getAll };