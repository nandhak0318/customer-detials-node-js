const express = require('express')

const router = express.Router()

const {
  getSingleCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerImage,
} = require('../controllers/customerController')

router.get('/detials/:id', getSingleCustomer)
router.put('/update/:id', updateCustomer)
router.get('/image/:id', getCustomerImage)
router.post('/insert', createCustomer)
router.delete('/delete/:id', deleteCustomer)
module.exports = router
