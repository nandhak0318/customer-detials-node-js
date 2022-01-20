const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const sequelize = require('../db/database')
const Customer = require('../models/customer')
router.post(
  '/register',
  passport.authenticate('register', { session: false }),
  async (req, res, next) => {
    user = req.user
    const body = { id: user.id, email: user.email }
    const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    })

    return res.status(200).json({ user, token })
  },
)
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        console.log(err)
        const error = new Error('An error occurred.')

        return next(error)
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)

        const updatejson = { lastLoggedIn: Date.now() }
        const update = await Customer.update(updatejson, {
          where: { id: user.id },
        })

        const body = { id: user.id, email: user.email }
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_LIFETIME,
        })

        return res.status(200).json({ token })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})
// router.get('/logout', logout)

module.exports = router
