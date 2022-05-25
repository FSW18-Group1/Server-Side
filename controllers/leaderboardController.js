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
      } else {
        res.status(404).json({
          result: 'Failed',
          message: 'Data not found',
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
        }
      });
      if (listLeaderboard) {
        console.log(("datanya",listLeaderboard));
        res.status(200).json({
          result: 'Success',
          data: listLeaderboard
        });
      } else {
        res.status(404).json({
          result: 'Failed',
          message: 'Data not found',
        });
      }


    } catch (error) {
      next(error);
    }
  }

  static async submitScore(req,res,next){
    try {
      const {id} = req.params;
      const points  = req.body.points; 
      const player = req.body.id;
      const listplayer = await Leaderboards.findOne({where:{
        playerId: player,
        gameId: id,
      }})
      console.log(listplayer);
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
        // console.log("masuk",points, id, req.body.id);
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


      // if (leaderboard) {
      //   const point = req.body;
      //   const updateleaderboard = await Leaderboards.update({where: {
      //     points: point
      //   }});
      //   if (updateleaderboard){
      //     return res.status(200).json({
      //       result: "Success",
      //       message: "Updated",
      //       data: updateleaderboard
      //     })
      //   }
      // };      
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { LeaderboardsController }