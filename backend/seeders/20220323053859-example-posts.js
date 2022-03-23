'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [
      {
        username: 'xXVladPutinXx',
        content: 'I hate democracy or something'
      },
      {
        username: 'Kytech',
        content: 'Go to https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
      {
        username: 'Simponic',
        content: 'Gaming',
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
