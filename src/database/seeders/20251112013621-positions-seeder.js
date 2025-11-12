'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Positions', [
      {
        positionId: 1,
        positionName: 'Admin',
        status: true
      },
      {
        positionId: 2,
        positionName: 'Supervisor',
        status: true
      },
      {
        positionId: 3,
        positionName: 'Designer',
        status: true
      },
      {
        positionId: 4,
        positionName: 'Analyst',
        status: true
      },
      {
        positionId: 5,
        positionName: 'Tester QA',
        status: true
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Positions', null, {});
  }
};