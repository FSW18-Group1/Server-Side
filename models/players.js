'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require ('../middlewares/passwordHandler')
module.exports = (sequelize, DataTypes) => {
  class Players extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Players.hasOne(models.Leaderboards,{foreignKey:'playerId',sourceKey:'id'})
    }
  }
  Players.init({
    username: {
      type: DataTypes.STRING,
      unique:{
        args: true,
        msg: "Username already taken",
      },
      validate: {
        notEmpty:{
          args: true,
          msg:"Username is required",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: "Password is required"
        },
        len:{
          args: [8],
          msg: "Password must contain at least eight character",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique:{
        args: true,
        msg:"Email has been registered"
      },
    },
  }, {
    hooks: {
      async beforeCreate(instance){
        instance.password = await hashPassword(instance.password);
      }
    },
    sequelize,
    modelName: 'Players',
  });
  return Players;
};