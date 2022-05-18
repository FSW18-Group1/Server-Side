const express = require('express')
const app = express()
// const cors = require('cors')
const {router} = require('./routes/router')
const errorHandler = require('./middlewares/errorHandler')
const PORT = process.env.PORT || 3000


// app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(errorHandler)


app.use("/", router)



app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})