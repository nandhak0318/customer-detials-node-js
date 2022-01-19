require('dotenv').config()
require('express-async-errors')
const sequelize = require('./db/database')
// express

const express = require('express')
const app = express()
// rest of the packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')

// routes
const customerRouter = require('./routes/customerRoutes')
// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  }),
)
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.use(express.static('./uploads'))
app.use(express.static('./public'))
app.use(fileUpload())

app.use('/', customerRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    )
  } catch (err) {
    console.log(err)
  }
}

start()
