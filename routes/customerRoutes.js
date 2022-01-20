const express = require('express')

const router = express.Router()

const {
  getSingleCustomer,
  createCustomer,
  deleteCustomer,
  getCustomerImage,
  getAllCustomers,
} = require('../controllers/customerController')

router.get('/detials/:id', getSingleCustomer)
router.get('/customers', getAllCustomers)
router.get('/image/:id', getCustomerImage)
router.post('/insert', createCustomer)
router.delete('/delete/:id', deleteCustomer)
module.exports = router
