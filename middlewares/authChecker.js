const jwt = require('jsonwebtoken')

module.exports = async(req,res,next)=>{
  const token = req.cookies['token'];
  console.log('masuk 1',req);
  try {
    const player = jwt.verify(token,process.env.SECRET);
    // console.log('masuk 2', player);
    if (player) {
      const login = await player.id;
      // console.log('masuk 3',login);
      if (login) {
        req.player = player;
        // console.log('masuk 4',player);
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Credentials",true);
        next()
      } else {
        res.status(403).json({
          result: 'Forbidden',
          message: 'You must login first!!!',
        });
      }
    }
  } catch (error) {
    res.clearCookie('token')
    res.status(403).json({
      result: 'Forbidden',
      message: 'You must login first!!!',
    });
  }
}