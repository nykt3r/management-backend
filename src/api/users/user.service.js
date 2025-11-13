const userRepository = require('./user.repository');
const { hashPassword} = require('../../../shared/utils/util');
const { get } = require('../auth/auth.routes');


const getAllUsers = async () => {
    return await userRepository.getAllUsers();
};

const getUserById = async (id) => {
    return await userRepository.getUserById(id);
};

const createUser = async (userData) => {
    const hashPassword = await hashPassword(userData.password);
    return await userRepository.createUser({...userData, password:hashedPassword});
}

const updateUser = async (id, userData) => {
    if (userData.password){
        userData.password = await hashPassword(userData.password);
    }
    await userRepository.updateUser(id, userData);
    return await userRepository.findUserById(id);
};

const deleteUser = async (id) => {
    return await userRepository.deleteUser(id);
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};