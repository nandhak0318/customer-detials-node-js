const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const sequelize = require('../db/database')
const validPassword = require('../utils/valid-password')
const UserModel = require('../models/customer')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const crypto = require('crypto')
const path = require('path')
const errors = require('../errors')
const jwt = require('jsonwebtoken')
passport.use(
  'register',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        let { name, email, password, totalOrders } = req.body
        if (!req.files) {
          throw new errors.BadRequestError('No file uploaded')
        }

        const file = req.files.image

        if (!file.mimetype.startsWith('image')) {
          throw new errors.BadRequestError('File type not supported')
        }

        if (file.size > 1024 * 1024 * 10) {
          throw new errors.BadRequestError(
            'Fize size must be smaller than 1 mb',
          )
        }

        const ext = file.name.split('.')
        const temp = Date.now().toString() + file.name
        const tempFileName = crypto.createHash('md5').update(temp).digest('hex')
        const imgName = tempFileName + `.${ext[1]}`
        const upPath = path.join(__dirname, '../public/uploads/') + imgName
        await file.mv(upPath, async function (err) {
          if (err) {
            return res.status(500).send(err)
          }
        })
        const img = `/uploads/${imgName}`
        const lli = Date.now()
        const {
          id,
          name: uname,
          email: uemail,
          totalOrders: utotalOrders,
          image,
        } = await UserModel.create({
          name,
          email,
          password,
          image: img,
          totalOrders,
          lastLoggedIn: lli,
        })
        const user = {
          id: id,
          name: uname,
          email: uemail,
          totalOrders: utotalOrders,
          image,
        }
        return done(null, user)
      } catch (error) {
        done(error)
      }
    },
  ),
)

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findAll({
          where: {
            email: email,
          },
          attributes: {
            exclude: ['updated_at', 'created_at', 'lastLoggedIn'],
          },
        })
        const hash = user[0].dataValues.password
        if (user.length === 0) {
          return done(null, false, { message: 'User not found' })
        }

        const validate = await validPassword(password, hash)

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' })
        }

        return done(null, user, { message: 'Logged in Successfully' })
      } catch (error) {
        console.log(error)
        return done(error)
      }
    },
  ),
)

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const user = token.user
        return done(null, user)
      } catch (error) {
        done(error)
      }
    },
  ),
)
