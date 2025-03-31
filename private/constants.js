import bcrypt from 'bcryptjs'

const SALT = bcrypt.genSaltSync(10)

export { SALT }
