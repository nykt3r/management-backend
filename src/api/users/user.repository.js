const { User, Position } = require('../../database/models');


const findUserByEmail = async (email) => {

    return await User.findOne({
        where: { email },
        include: [{model: Position, as: 'position'}]
    });
};

const findUserByPhone = async (phone) => {
    return await User.findOne({
        where: {phone}
    });
};

const findUserById = async (id) => {
    return await User.findByPk(id,{
        include: [{model: Position, as : 'position'}],
    });
};

const getPaginatedUsers = async (limit, offset) => {
    return await User.findAndCountAll({
        include:[{model: Position, as: 'position'}],
        limit,
        offset,
    });
};



const createUser = async (userData) => await User.create(userData);
const getAllUsers = async () => await User.findAll();
const updateUser = async (id,userData) => await User.update(userData, {where: { id }});
const deleteUser = async (id) => await User.destroy({where: { id }});

module.exports = {
findUserByEmail,
findUserById,
createUser,
getAllUsers,
getPaginatedUsers,
updateUser,
deleteUser,
findUserByPhone
}