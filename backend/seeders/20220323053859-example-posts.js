'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [
      {
        username: 'WebSocket',
        content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
      {
        username: 'Simponic',
        content: 'Gaming',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
