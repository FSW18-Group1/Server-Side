'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Leaderboards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Leaderboards.belongsTo(models.Players,{foreignKey:'playerId',targetKey:'id'});
      Leaderboards.belongsTo(models.Games,{foreignKey:'gameId',targetKey:'id'});
    }
  }
  Leaderboards.init({
    playerId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Leaderboards',
  });
  return Leaderboards;
};