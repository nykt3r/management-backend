const { Position, User, sequelize}  = require('../../database/models');

const findPositionById = async (id) => {
    return await Position.findByPk(id);
}

const getPaginatedPositions = async (limit, offset) =>{
    return await Position.findAndCountAll({
        limit,
        offset,
    });
}

const getPositionByName = async (data) => {
    return await Position.findOne({
        where: { positionName: data.positionName}
    })
} 

const getAllPositions = async () =>{
    return await Position.findAll({
        where: {status: true},
        attributes:['positionId', 'positionName', 'status'],
    });
}


const createPosition = async (positionData) => {
    return await Position.create({
        positionName: positionData.positionName,
        status: positionData.status || true,
    });
}

const updatePosition = async (id, data) => {
    return await Position.update(data, { where: { positionId: id } });
};


const deletePosition = async (id) => {
    return await Position.destroy({ where: { positionId: id } });
};

const countUsersByPosition = async (positionId, transaction) => {
    return await User.count({
        where: { positionId },
        transaction
    });
};


module.exports = {
    findPositionById,
    getPositionByName,
    getPaginatedPositions,
    getAllPositions,
    createPosition,
    updatePosition,
    deletePosition,
    countUsersByPosition,
    sequelize,
};