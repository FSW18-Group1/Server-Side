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

  // static async submitScore(req,res,next){
  //   try {
  //     const {gamesid} = req.params;
  //     const {playerId} = req.cookie.data.id;
  //     const leaderboard = await Leaderboards.findAll({
  //       where:{
  //         gameId: gamesid,
  //         playerId: playerId,
  //       },
  //     });
  //     if (leaderboard) {
  //       const point = req.body;
  //       const updateleaderboard = await Leaderboards.update(req.body,{
  //         where:{
  //           points: point
  //         }
  //       });
  //       if (updateleaderboard){
  //         return res.status(200).json({
  //           result: "Success",
  //           message: "Leaderboard successfully updated",
  //         });
  //       };
  //     };
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}

module.exports = { LeaderboardsController }