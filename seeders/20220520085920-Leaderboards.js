'use strict';

module.exports = {
  async up (queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Leaderboards',[
     {
       playerId: 1,
       gameId: 1,
       points: 7, 
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       playerId: 1,
       gameId: 2,
       points: 1,
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       playerId: 2,
       gameId: 1,
       points: 1,
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       playerId: 2,
       gameId: 2,
       points: 7,
       createdAt: new Date(),
       updatedAt: new Date(),
     },
   ])
  },

  async down (queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Leaderboards')
  }
};
