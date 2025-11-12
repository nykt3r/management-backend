'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@example.com',
        age: 30,
        phone: '3001234567',
        positionId: 1, // Administrador
        password: passwordHash,
      },
      {
        id: 2,
        firstName: 'María',
        lastName: 'Gómez',
        email: 'maria.gomez@example.com',
        age: 25,
        phone: '3012345678',
        positionId: 2, // Desarrollador
        password: passwordHash,
      },
      {
        id: 3,
        firstName: 'Carlos',
        lastName: 'López',
        email: 'carlos.lopez@example.com',
        age: 28,
        phone: '3023456789',
        positionId: 3, // Diseñador
        password: passwordHash,
      },
      {
        id: 4,
        firstName: 'Laura',
        lastName: 'Torres',
        email: 'laura.torres@example.com',
        age: 35,
        phone: '3034567890',
        positionId: 4, // Analista
        password: passwordHash,
      },
      {
        id: 5,
        firstName: 'Andrés',
        lastName: 'Martínez',
        email: 'andres.martinez@example.com',
        age: 27,
        phone: '3045678901',
        positionId: 5, // Tester QA
        password: passwordHash,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};