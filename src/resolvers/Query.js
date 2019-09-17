const { isAuthenticated } = require('../utils')

const info = () => `This is the API of a Hackernews Clone`

const feed = async (root, args, context, info) => {
  if (isAuthenticated(context)) {
    const where = args.filter ? {
      OR: [
        { description_contains: args.filter },
        { url_contains: args.filter }
      ]
    } : {}

    const links = await context.prisma.links({
      where,
      skip: args.skip,
      first: args.first,
      last: args.last,
      orderBy: args.orderBy
    })

    const count = await context.prisma.linksConnection({
      where
    }).aggregate().count()

    return {
      links,
      count
    }
  }
}

const link = (parent, args, context, info) => {
  if (isAuthenticated(context)) {
    return context.prisma.link({
      id: args.id
    })
  }
}

module.exports = {
  info,
  feed,
  link
}