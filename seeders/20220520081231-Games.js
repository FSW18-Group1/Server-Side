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
   await queryInterface.bulkInsert('Games',[
     {
       id: 1,
       gamesname: 'Pingsut',
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       id: 2,
       gamesname: 'Capsa',
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
    await queryInterface.bulkDelete('Games')
  }
};
