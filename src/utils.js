const jwt = require('jsonwebtoken')
const APP_SECRET = 'Some-secret123'

const getUserId = context => {
  const Authorization = context.request.get('Authorization')
  if (isAuthenticated(context)) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }
}

const isAuthenticated = context => {
  const auth = context.request.get('Authorization')
  if (auth) {
    return true
  } else {
    throw new Error('Not authenticated')
  }
}

module.exports = {
  APP_SECRET,
  getUserId,
  isAuthenticated
}