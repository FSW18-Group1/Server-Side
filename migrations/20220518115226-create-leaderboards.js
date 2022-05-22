'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Leaderboards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playerId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Players',
          key: 'id',
        }
      },
      gameId:{
        type: Sequelize.INTEGER,
        references:{
          model: 'Games',
          key: 'id',
        }
      },
      points: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Leaderboards');
  }
};