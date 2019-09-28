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
# Add names to queries to store multiple in one playground

# Simple get information about schema query
query GetInfo {
  info
}

# Sign up a new user 
mutation SignUp {
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
mutation LogIn {
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
# {
#   "Authorization": "Bearer __TOKEN__"
# }

# Simple get all information about your feed (links)
query GetFeed {
  feed {
    links {
      id,
      url,
      description,
      postedBy {
        id,
        name
      },
      votes {
        id,
        user {
          name
        }
      }
    }
  }
}

# Add a new link to the feed
mutation PostNewLink {
  post(
    url:"new-one",
    description:"description"
  ) {
    id,
    url,
    description
  }
}

# Get an individual link from the feed
query GetSingleLink {
  link(id:"cjz1o0aw5xzaz0b53am7cjsv5") {
    id,
    description,
    url,
    votes {
      user {
        name
      }
    }
  }
}

#Search for links that the description or url contains the filter string
query SearchFeed {
  feed(filter:"description") {
    count
    links {
      id
  		description
    	url
    	postedBy {
      	id
      	name
   	 	}
    }
  }
}

# Query with paging (first=(limit/first x elements), skip=offset, last=(last x elements)
query GetLinksPaging {
  feed(
    first: 2
    skip: 3
  ) {
    links {
      id
      description
      url
    }
  }
}

# Query with an orderBy order
query GetOrderedFeed {
  feed(orderBy: createdAt_ASC) {
    count
    links {
      id
      description
      url
    }
  }
}

# Delete a link from within the feed
mutation DeleteLink {
  deleteLink(
    id: "cjz1o0aw5xzaz0b53am7cjsv5"
  ) {
    id,
    description
  }
}

# Update the link within the feed
mutation UpdateLink {
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

# Vote for a link
mutation VoteForALink {
  vote(linkId: "__LINK_ID__") {
    link {
      url
      description
    }
    user {
      name
      email
    }
  }
}

# Subscription to inform when a new link is created 
subscription LinkSubscription {
  newLink {
      id
      url
      description
      postedBy {
        id
        name
        email
      }
  }
}

# Subscription to inform when a new upvote is created 
subscription VoteSubscription {
  newVote {
    id
    link {
      url
      description
    }
    user {
      name
      email
    }
  }
}
```

## Database information 
1. Add prisma dependency with `yarn global add prisma`
2. Deploy DB `prisma deploy`.  Follow instructions here: https://www.howtographql.com/graphql-js/4-adding-a-database/
3. Generate a client using `prisma generate`

How to use prisma: https://www.prisma.io/client/client-javascript/

## Pagination information
Limit and offset are called differently in the Prisma API:

- The limit is called first, meaning you’re grabbing the first x elements after a provided start index. Note that you also have a last argument available which correspondingly returns the last x elements.
- The start index is called skip, since you’re skipping that many elements in the list before collecting the items to be returned. If skip is not provided, it’s 0 by default. The pagination then always starts from the beginning of the list (or the end in case you’re using last).

## Ordering/Sorting information
You can order by any of the following
```
enum LinkOrderByInput {
  description_ASC
  description_DESC
  url_ASC
  url_DESC
  createdAt_ASC
  createdAt_DESC
}
```

### Next
1. Add postedBy to update.  Does update work if you don't supply some information in args (e.g url or description)
2. Create new query, to only get links for user in token
3. Duplicate all methods, so that you have a query/mutation that can only act on the current user in tokens links/feed.  e.g can only update if it is a link posted by you
4. Return createdAt for a link
5. Add more count endpoints.  Full count, filtered count etc
6. More reading: https://www.prisma.io/blog/