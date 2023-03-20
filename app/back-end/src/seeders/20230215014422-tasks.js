'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tasks', [{
      title: 'Estudar Flutter',
      description: 'Tenho que estudar flutter e aprender o básico em até 2 semanas para ter mais chance no processo seletivo.',
      status: 'Pending',
      user_id: 1,
      created: '2023-02-14T10:00:00',
    }, {
      title: 'Refazer projeto',
      description: 'Tenho que refazer todo o front-end do projeto pois apaguei sem querer.',
      status: 'Pending',
      user_id: 1,
      created: '2023-02-15T15:35:00',
    }, {
      title: 'Estudar vue',
      description: 'Tenho que estudar vue-js 2 para ter mais oportunidades de emprego.',
      status: 'In-progress',
      user_id: 1,
      created: '2023-02-15T16:35:00',
    }, {
      title: 'Fazer code-review',
      description: 'Tenho que fazer um code-review de um de meus projetos pessoais.',
      status: 'In-progress',
      user_id: 1,
      created: '2023-02-15T16:55:00',
    }, {
      title: 'Estudar react',
      description: 'Tenho que estudar react-js para ter mais oportunidades de emprego.',
      status: 'Finished',
      user_id: 1,
      created: '2023-02-10T10:30:00',
    }, {
      title: 'Pesquisar sobre designer',
      description: 'Quero procurar saber mais sobre designer de web.',
      status: 'Pending',
      user_id: 2,
      created: '2023-02-28T10:00:00',
    }, {
      title: 'Estudar inglês',
      description: 'Tenho que estudar inglês para ficar fluente.',
      status: 'In-progress',
      user_id: 2,
      created: '2023-02-28T15:30:00',
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};
