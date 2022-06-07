if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const passport = require ('./middlewares/passport-jwt')
const { playerRouter } = require('./routes/playerRouter')
const { accessbilityRouter } = require('./routes/accessbilityRouter')
const { leaderboardRouter } = require('./routes/leaderboardRouter')
const errorHandler = require('./middlewares/errorHandler')
// const authChecker = require('./middlewares/authChecker')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000

app.use(passport.initialize());
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(errorHandler)
app.use(cookieParser())
app.use(cors())

app.use("/", accessbilityRouter)
app.use("/games", leaderboardRouter)
app.use(passport.authenticate('jwt', { session: false }))
app.use("/profile", playerRouter)



app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})