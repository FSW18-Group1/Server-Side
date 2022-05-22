const { Games } = require ('../models')

class GameController{
  static async getAllGames(req,res,next){
    try {
      const games = await Games.findAll({attributes: {exclude: ['createdAt','updatedAt']}});
      if(games){
        return res.status(200).json({
          result: "Success",
          data: games,          
        });
      }
    } catch (error) {
      next(error);
    }
  }

}

module.exports =  GameController 