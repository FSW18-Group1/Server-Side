const { Players, Games, Leaderboards } = require('../models')

class LeaderboardsController {

  static async getLeaderboards(req,res,next){
    try {
      const listLeaderboards = await Leaderboards.findAll({ 
        include: [ Games, Players ],
        attributes: {
          exclude: ['createdAt','updatedAt']
        }        
      });
      // console.log('masuk',listLeaderboards);
      if (listLeaderboards) {
        res.status(200).json({
          result: 'Success',
          data: listLeaderboards,
        });
      } 
    } catch (error) {
      next (error);
    }
  }

  static async getLeaderboardById(req,res,next){
    try {
      const {id} = req.params;
      const listLeaderboard = await Leaderboards.findAll({
        where: {gameId:id},
        limit: 5,
        order: [['points','DESC']],
        include:[ Games, Players ],
        attributes: {
          exclude: ['createdAt','updatedAt'],
        },
      });
      if (listLeaderboard) {
        // console.log(("datanya",listLeaderboard));
        res.status(200).json({
          result: 'Success',
          data: listLeaderboard
        });
      } 
    } catch (error) {
      next(error);
    }
  }

  static async submitScore(req,res,next){
    try {
      const {id} = await req.params;
      const points  = await req.body.points; 
      const player = await req.body.id;
      const listplayer = await Leaderboards.findOne({where:{
        playerId: player,
        gameId: id,
      }})
      // console.log(listplayer);
      if (!listplayer) {
        const createdLeaderboard = await Leaderboards.create({
          playerId: player,
          gameId: id,
          points: points,
        })
        if (createdLeaderboard) {
          return res.status(201).json({
            result: "Success",
            data: createdLeaderboard,
          });
        }
      } else {
        const updatedleaderboard = await Leaderboards.update({points: points},{
          where: {  gameId: id, playerId: player },
        });   
        if (updatedleaderboard == 1 ) {
          return res.status(200).json({
            result: "Success",
            message: "Points successfully updated"
          });
        } else {
          return res.status(500).json({
            result: "Failed",
            message: "Failed to update",
          });
        }        
      }    
    } catch (error) {
      next(error);
    }
  }
}


module.exports = { LeaderboardsController }