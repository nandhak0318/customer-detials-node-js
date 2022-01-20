const bcrypt = require('bcryptjs')

const validPassword = async (pass, hash) => {
  const isValid = await bcrypt.compare(pass, hash)
  return isValid
}

module.exports = validPassword
