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
  info,
  feed {
    id
  }
}

# Simple get all information about your feed (links)
query {
  feed {
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
1. https://www.howtographql.com/graphql-js/6-authentication/
 