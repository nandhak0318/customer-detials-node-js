const sequelize = require('../db/database')
const Customer = require('../models/customer')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const crypto = require('crypto')
const path = require('path')
const fs = require('fs')
const getAllCustomers = async (req, res) => {
  const customers = await Customer.findAll({
    attributes: {
      exclude: ['updated_at', 'created_at', 'password', 'lastLoggedIn'],
    },
  })
  res.status(200).json({ customers })
}
const getCustomerImage = async (req, res) => {
  const id = req.params.id
  const isExist = await Customer.findAll({
    where: {
      id: id,
    },
    attributes: {
      exclude: ['updated_at', 'created_at', 'password', 'lastLoggedIn'],
    },
  })
  if (isExist.length === 0) {
    throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`)
  }
  const customer = await Customer.findAll({
    where: {
      id: id,
    },
    attributes: ['image'],
  })
  const image = customer.map((item) => item.image)
  res.status(200).json({ user_image: image[0] })
}

const getSingleCustomer = async (req, res) => {
  const id = req.params.id
  const customer = await Customer.findAll({
    where: {
      id: id,
    },
    attributes: {
      exclude: ['updated_at', 'created_at', 'password', 'lastLoggedIn'],
    },
  })
  if (customer.length === 0) {
    throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json({ user_detial: customer })
}

const createCustomer = async (req, res) => {
  const { name, email, password, totalOrders } = req.body
  if (!req.files) {
    throw new errors.BadRequestError('No file uploaded')
  }

  const file = req.files.image

  if (!file.mimetype.startsWith('image')) {
    throw new errors.BadRequestError('File type not supported')
  }

  if (file.size > 1024 * 1024 * 10) {
    throw new errors.BadRequestError('Fize size must be smaller than 1 mb')
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
  const customer = await Customer.create({
    name,
    email,
    password,
    image: img,
    totalOrders,
    lastLoggedIn: lli,
  })
  delete customer['password']
  delete customer['updated_at']
  delete customer['created_at']
  delete customer['password']
  delete customer['lastLoggedIn']
  res.status(200).json({ msg: `customer created succesfully` })
}

// update user with user.save()
const updateCustomer = async (req, res) => {
  const id = req.params.id
  if (req.params.id != req.user.id) {
    throw new CustomError.UnauthenticatedError(
      `you don't have access to update this user`,
    )
  }
  const isExist = await Customer.findAll({
    where: {
      id: id,
    },
    attributes: {
      exclude: ['updated_at', 'created_at', 'password', 'lastLoggedIn'],
    },
  })
  if (isExist.length === 0) {
    throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`)
  }
  let updateJosn = {}
  const { name, email, totalOrders } = req.body
  if (name) {
    updateJosn.name = name
  }
  if (email) {
    updateJosn.email = email
  }
  if (totalOrders) {
    updateJosn.totalOrders = totalOrders
  }

  if (req.files != null && req.files.image) {
    const file = req.files.image
    if (!file.mimetype.startsWith('image')) {
      throw new errors.BadRequestError('File type not supported')
    }

    if (file.size > 1024 * 1024 * 10) {
      throw new errors.BadRequestError('Fize size must be smaller than 1 mb')
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
    if (img) {
      updateJosn.image = img
    }
  }

  const update = await Customer.update(updateJosn, { where: { id: id } })

  res.status(200).json({ msg: `user detials updated succesfully` })
}

const deleteCustomer = async (req, res) => {
  const id = req.params.id
  const isExist = await Customer.findAll({
    where: {
      id: id,
    },
    attributes: {
      exclude: ['updated_at', 'created_at', 'password', 'lastLoggedIn'],
    },
  })
  if (isExist.length === 0) {
    throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`)
  }

  const customer = await Customer.destroy({ where: { id: id } })

  res.status(200).json({ msg: `user deleted succesfully` })
}

module.exports = {
  getCustomerImage,
  updateCustomer,
  getSingleCustomer,
  createCustomer,
  deleteCustomer,
  getAllCustomers,
}
