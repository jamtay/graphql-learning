# Simple GraphQL backend for hackernews clone

This is based on the following tutorial https://www.howtographql.com/graphql-js/0-introduction/

## To run 

1. From the root run `yarn add graphql-yoga`
2. From the root run `node src/index.js`

## To use

After running 

1. Go to localhost:4000
2. Enter one of the following queries or mutations in the playground
```
# Simple get information about schema query
query {
  info
}

# Sign up a new user 
mutation {
  signup(
    name: "Alice"
    email: "alice@prisma.io"
    password: "graphql"
  ) {
    token
    user {
      id
    }
  }
}

#Login with user 
mutation {
  login(
    email: "alice@prisma.io"
    password: "graphql"
  ) {
    token
    user {
      email
      links {
        url
        description
      }
    }
  }
}

# Set token in header (all below requests need a token)
{
  "Authorization": "Bearer __TOKEN__"
}

# Simple get all information about your feed (links)
query {
  feed {
    id,
    url,
    description,
    postedBy {
      id,
      name
    }
  }
}

# Add a new link to the feed
mutation {
  post(
    url:"new-one",
    description:"description"
  ) {
    id,
    url,
    description
  }
}

#Get an individual link from the feed
query {
  link(id:"cjz1o0aw5xzaz0b53am7cjsv5") {
    id,
    description,
    url
  }
}

# Delete a link from within the feed
mutation {
  deleteLink(
    id: "cjz1o0aw5xzaz0b53am7cjsv5"
  ) {
    id,
    description
  }
}

# Update the link within the feed
mutation {
  updateLink(
    id:"cjz1o0aw5xzaz0b53am7cjsv5",
  	url: "url-test",
    description: "editied-description"
  ), {
    id,
    url,
    description
  }
}
```

## Database information 
1. Add prisma dependency with `yarn global add prisma`
2. Deploy DB `prisma deploy`.  Follow instructions here: https://www.howtographql.com/graphql-js/4-adding-a-database/
3. Generate a client using `prisma generate`

How to use prisma: https://www.prisma.io/client/client-javascript/

### Next
1. Add postedBy to update.  Does update work if you don't supply some information in args (e.g url or description)
2. Create new query, to only get links for user in token
3. Duplicate all methods, so that you have a query/mutation that can only act on the current user in tokens links/feed.  e.g can only update if it is a link posted by you
4. https://www.howtographql.com/graphql-js/7-subscriptions/
 