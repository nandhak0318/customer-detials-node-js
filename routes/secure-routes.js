const express = require('express')
const router = express.Router()
const {
  createCustomer,
  updateCustomer,
} = require('../controllers/customerController')

router.put('/update/:id', updateCustomer)
router.post('/insert', createCustomer)
module.exports = router
