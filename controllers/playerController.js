const { Players } = require('../models')
const { hashPassword, verifyPassword, } = require('../middlewares/passwordHandler')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken');
const passwordHandler = require('../middlewares/passwordHandler');

class PlayerController{
  static async createPlayer(req, res, next){
    try {
      const { username, email, password } = req.body;
      if (!username || !email) {
        res.status(400).json({
          result: "Failed",
          message: "Username or Email cannot be empty",
        });
      }
      if (!password) {
        res.status(400).json({
          result: "Failed",
          message: "Password cannot be empty"
        })
      }
      if (password.length < 8) {
        return res.status(400).json({
          result: "Failed",
          message: "Password must contain at least eight character"
        })
      }
      const newPlayer = {
        username: username,
        email: email,
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
      const { username, email, password } = req.query;
      if (username) {
        conditions.push({ username });
      }
      if (email) {
        conditions.push({ email });
      }
      if (password) {
        conditions.push({ password:hashPassword(password) })
      }
      const data = await Players.findAll({
        where: {
          [Op.and]: conditions
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
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
      const newUpadatePlayer = {
        username: req.body.username,
        email: req.body.email,
        password: await hashPassword(req.body.password)
      }
      const updatedPlayer = await Players.update(newUpadatePlayer,{
        where: { id: id }
      });
      if (updatedPlayer == 1) {
        return res.status(200).json({
          result: "Success",
          message: `Player with id: ${id} successfully updated`,
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
        where: { id: id }
      });      
      if (destroyed == 1) {
        res.status(200).json({
          result: "Success",
          message: `Player with id: ${id}, was deleted successfully`,
        });
      } else {
        res.status(400).json({
          result: "Failed",
          message: `Cannot delete Player with id: ${id}. Maybe Player was not found!`,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async signedPlayer(req,res,next){
    try {
      const { username, email, password } = req.body;
      if (!username || !email) {
        res.status(400).json({
          result: 'Failed',
          message: 'username or email cannot be empty',
        });
      }
      if (!password){
        res.status(400).json({
          result: 'Failed',
          message: 'password cannot be empty',
          });
      }
      const Player = await Players.findOne({where:{username,email}});
      // console.log('data 1: ', Player.password);
      // console.log('data 2: ', isValid);
      if (!Player) {
        res.status(400).json({
          result: 'Failed',
          message: "Please register first",
        });
      } else {
        const isValid = await verifyPassword(password,Player.password);
        // console.log('1',password);
        // console.log('1',isValid);
        // console.log('1',Player.password);
        if (!isValid) {
          res.status(400).json({
            result: 'Failed',
            message: "password doesn't match",
          });
        } else {
          const payload = {
            id: Player.id,
            username : Player.username,
            email: Player.email
          };
          const secret = process.env.SECRET;
          const token = jwt.sign(payload,secret,{expiresIn: '1 hour', noTimestamp: true});
          // res.cookie('token',token)
          // console.log(payload)
          res.status(200).json({
            result: 'Success',
            data: payload,
            token: token,          
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }

}
module.exports = PlayerController