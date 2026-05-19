'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      { id: 'ADMIN',    roleName: 'ADMIN',    createdAt: new Date(), updatedAt: new Date() },
      { id: 'LANDLORD', roleName: 'LANDLORD', createdAt: new Date(), updatedAt: new Date() },
      { id: 'TENANT',   roleName: 'TENANT',   createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};