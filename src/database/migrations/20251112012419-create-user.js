'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      positionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Positions',
          key: 'positionId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          len: [8, 255]
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
