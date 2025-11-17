const { User, Position, sequelize } = require('../../database/models');

const dashboardRepository = {

    getTotalUsers(){
        return User.count();
    },

    getTotalPositions(){
        return Position.count();
    },

    getAverageAge(){

        return User.findOne({
            attributes: [
                [sequelize.fn('AVG', sequelize.col('age')), 'averageAge']
            ]
        });
    },

        getUsersByPosition() {
            return User.findAll({
                attributes: [
                    'positionId',
                    [sequelize.fn('COUNT', sequelize.col('User.id')), 'count']
                ],
                group: ['positionId'],
                include: {
                    model: Position,
                    as: 'position', // 🔹 aquí pones el alias definido en la asociación
                    attributes: ['positionName']
                }
            });
        },

        getAgeDistribution() {
        return User.findAll({
            attributes: ['age']
        });
    }
};

module.exports = {dashboardRepository};