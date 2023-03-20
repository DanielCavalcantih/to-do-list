'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      name: 'Daniel Cavalcanti',
      email: 'danielcavalcanti8000@gmail.com',
      password: 'daniel123',
      dark_mode: true,
    }, {
      name: 'Isadora Maiara',
      email: 'isadoramaiara@gmail.com',
      password: 'isadora123',
      dark_mode: false,
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
