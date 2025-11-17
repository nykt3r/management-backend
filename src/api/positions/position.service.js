// src/api/positions/position.service.js

const repository = require('./position.repository');
const { sequelize } = repository;

const getPaginatedPositions = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    const { count, rows } = await repository.getPaginatedPositions(limit, offset);

    return {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        positions: rows
    };
};

const getAllPositions = async () => {
    return await repository.getAllPositions();
};

const getPositionById = async (id) => {
    const position = await repository.findPositionById(id);
    if (!position) throw new Error("Position not found");
    return position;
};

const createPosition = async (data) => {
    return await repository.createPosition(data);
};

const updatePosition = async (id, data) => {
    const existing = await repository.findPositionById(id);
    if (!existing) throw new Error("Position not found");

    // Si trae nuevo nombre, validar que no exista
    if (data.positionName) {
        const duplicate = await repository.getPositionByName({ positionName: data.positionName });

        if (duplicate && duplicate.positionId !== parseInt(id)) {
            throw new Error("Position name already exists");
        }
    }

    await repository.updatePosition(id, data);
    return await repository.findPositionById(id);
};

const deletePosition = async (id) => {
    const transaction = await sequelize.transaction();

    try {
        const position = await repository.findPositionById(id);
        if (!position) throw new Error("Position not found");

        const usersCount = await repository.countUsersByPosition(id, transaction);

        if (usersCount > 0) {
            throw new Error("Cannot delete position with associated users");
        }

        await repository.deletePosition(id, transaction);

        await transaction.commit();

        return { success: true, message: "Position deleted successfully" };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

module.exports = {
    getPaginatedPositions,
    getAllPositions,
    getPositionById,
    createPosition,
    updatePosition,
    deletePosition
};
