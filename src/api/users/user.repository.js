const { User, Position } = require('../../database/models');


const findUserByEmail = async (email) => {

    return await User.findOne({
        where: { email },
        include: [{model: Position, as: 'position'}]
    });
};

const findUserById = async (id) => {
    return await User.findByPk(id,{
        include: [{model: Position, as : 'position'}],
    });
};

const createUser = async (data) => await User.create(data);
const getAllUsers = async () => await User.findAll();
const updateUser = async (id,data) => await User.update(data, {where: { id }});
const deleteUser = async (id) => await User.destroy({where: { id }});

module.exports = {
findUserByEmail,
findUserById,
createUser,
getAllUsers,
updateUser,
deleteUser,
}