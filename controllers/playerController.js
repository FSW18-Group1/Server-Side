const { Players, Games, Leaderboards } = require('../models')
const {hashPassword} = require('./passwordHandler')
const { Op } = require('sequelize')

class PlayerController{
  static async createPlayer(req, res, next){
    try {
      const { username, email, password} = req.body;
      if (!username || !email) {
        return res.status(400).json({
          result: "Failed",
          message: "username or email cannot be empty",
        });
      }
      if (!password) {
        return res.status(400).json({
          result: "Failed",
          message: "password cannot be empty"
        })
      }
      const newPlayer = {
        username,
        email,
        password: await hashPassword(password),
      };
      const createdPlayer = await Players.create(newPlayer);
      if (createdPlayer) {
        return res.status(201).json({
          result: "Success",
          data: createdPlayer,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getPlayers(req, res, next){
    try {
      let conditions = [];
      const { username, email } = req.query;
      if (username) {
        conditions.push({ username });
      }
      if (email) {
        conditions.push({ email });
      }

      const data = await Players.findAll({
        where: {
          [Op.and]: conditions,
        },
      });
      if (data) {
        return res.status(200).json({
          result: "Success",
          data: data,          
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getPlayerById(req, res, next){
    try {
      const { id } = req.params;
      const player = await Players.findByPk(id);
      if (player) {
        return res.status(200).json({
          result: "Success",
          data: player,
        });
      } else {
        return res.status(404).json({
          result: "Not found",
          message: `Player with id: ${id} not found`,
        })
      }
    } catch (error) {
      next(error);
    }
  }

  static async updatePlayer(req, res, next){
    try {
      const { id } = req.params;
      const player = await Players.findByPk(id);
      if (!player) {
        return res.status(404).json({
          result: "Not found",
          message: `Player with id: ${id} not found`,
        })
      }
      const updatedPlayer = await Players.update(req.body,{
        where: { id: id },
      });
      if (updatedPlayer == 1) {
        return res.status(200).json({
          result: "Success",
          message: `Player with id: ${id} successfully updated`,
        });
      } else {
        return res.status(500).json({
          result: "Failed",
          message: "Failed to update",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async deletePlayer(req, res, next) {
    try {
      const { id } = req.params;

      const destroyed = await Players.destroy({
        where: { id: id },
      });
      if (destroyed == 1) {
        res.status(200).json({
          result: "Success",
          message: `Player with id: ${id}, was deleted successfully`,
        });
      } else {
        res.status(400).json({
          result: "FAILED",
          message: `Cannot delete Player with id=${id}. Maybe Player was not found!`,
        });
      }
    } catch (error) {
      next(error);
    }
  }

}
module.exports = PlayerController