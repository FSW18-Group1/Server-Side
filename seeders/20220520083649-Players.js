'use strict';
const { hashPassword } = require("../middlewares/passwordHandler");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Players',[
     {
       id: 1,
       username: 'llollwawa',
       password: await hashPassword('hahahahahaha'),
       email: 'llollwawa@gmail.com',
       createdAt: new Date(),
       updatedAt: new Date(),
     },
     {
       id: 2,
       username: 'llollwawux',
       password: await hashPassword('hihihihihihi'),
       email: 'llollwawux@gmail.com',
       createdAt: new Date(),
       updatedAt: new Date(),
     },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Players')
  }
};
