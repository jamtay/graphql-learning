const _ = require('lodash')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId, isAuthenticated } = require('../utils')

const signup = async (parent, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.createUser({...args, password})
  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  return {
    token,
    user
  }
}

const login = async (parent, args, context, info) => {
  const user = await context.prisma.user({email: args.email})
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }
  const token = jwt.sign({userId: user.id}, APP_SECRET)

  return {
    token,
    user
  }
}

const post = (parent, args, context) => {
  const userId = getUserId(context)
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: {
      connect: {
        id: userId
      }
    }
  })
}

const updateLink = (parent, args, context, info) => {
  if (isAuthenticated(context)) {
    const data = {}
    if (!_.isEmpty(args.description)) {
      data.description = args.description
    }
    if (!_.isEmpty(args.url)) {
      data.url = args.url
    }
    return context.prisma.updateLink({
      data: data,
      where: {
        id: args.id
      }
    })
  }
}

const deleteLink = (parent, args, context, info) => {
  if (isAuthenticated(context)) {
    return context.prisma.deleteLink({
      id: args.id
    })
  }
}

const vote = async (parent, args, context, info) => {
  if (isAuthenticated(context)) {
    const userId = getUserId(context)

    const linkExists = await context.prisma.$exists.vote({
      user: { id: userId },
      link: { id: args.linkId }
    })

    if (linkExists) {
      throw new Error(`Already voted for link: ${args.linkId}`)
    }

    return context.prisma.createVote({
      user: { connect: { id: userId } },
      link: { connect: { id: args.linkId } }
    })
  }

}

module.exports = {
  signup,
  login,
  post,
  updateLink,
  deleteLink,
  vote
}