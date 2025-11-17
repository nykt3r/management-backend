const { hashPassword } = require('../../../shared/utils/util');
const userRepository = require('./user.repository');

const getPaginatedUsers = async (page= 1, limit =10) => {
    const offset = (page - 1) * limit;

    const {count, rows} = await userRepository.getPaginatedUsers(limit,offset);

    return {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        users: rows
    };
};

const getUserById = async (id) => {
    const user = await userRepository.findUserById(id);
    if (!user) throw new Error("User not found");
    return user;
};


const getAllUsers = async () => {
    return await userRepository.getAllUsers();
};

const createUser = async (userData) => {
    const hashedPassword = await hashPassword(userData.password);
    return await userRepository.createUser({
        ...userData, 
        password: hashedPassword
    });
}

const updateUser = async (id, userData) => {
    const user = await userRepository.findUserById(id);
    if (!user) throw new Error("User not found");

    if (userData.password) {
        userData.password = await hashPassword(userData.password);
    }

    await userRepository.updateUser(id, userData);

    return await userRepository.findUserById(id);
};

const deleteUser = async (id) => {
    const user = await userRepository.findUserById(id);
    if (!user) throw new Error("User not found");

    await userRepository.deleteUser(id);
    return user;
}



module.exports = {
    getAllUsers,
    getPaginatedUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};