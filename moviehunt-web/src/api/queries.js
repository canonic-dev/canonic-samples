export const MOVIE_FRAGMENT = `
  fragment MovieProps on Movie {
    _id
    title
    modifiedAt
    duration
    rating
    summary
    releaseDate
    upvotes {
      _id
    }
    cast {
      character
      actor {
        _id
        title
        modifiedAt
        birthday
        photo {
          url
        }
      }
    }
    poster {
      url
      name
    }
    genres {
      label
      value
    }
    trailers {
      label
      value
    }
  }
`

export const USER_FRAGMENT = `
fragment UserProps on User {
  email
  firstName
  lastName
  avatar {
    url
  }
}
`

export const ACTOR_FRAGMENT = `
fragment ActorProps on Actor {
  _id
  title
  biography
  birthPlace
  modifiedAt
  birthday
  photo {
    url
  }
}
`

export const LOGIN_URLS = `
query {
  getLoginUrlsForUser {
    GOOGLE
    FACEBOOK
    GITHUB
  }
}
`

export const LOGIN = `
mutation Login($code: String!, $service: String!) {
  loginForUser(code: $code, service: $service) {
    token
    user {
      ...UserProps
    }
  }
}
${USER_FRAGMENT}
`

export const AUTHENTICATE = `
mutation Login($token: String!) {
  authForUser(token: $token) {
    token
    user {
      ...UserProps
    }
  }
}
${USER_FRAGMENT}
`

export const MOVIES = `
query($limit: Int, $page: Int) {
  movies(limit: $limit, page: $page) {
    ...MovieProps
  }
}
${MOVIE_FRAGMENT}
`

export const MOVIES_FOR_ACTOR = `
query($_id: ID!, $limit: Int, $page: Int) {
  moviesForActor(_id: $_id, limit: $limit, page: $page) {
    ...MovieProps
  }
}
${MOVIE_FRAGMENT}
`

export const UPVOTE = `
mutation($_id: String!) {
  upvoteMovie(_id: $_id) {
    ...MovieProps
  }
}
${MOVIE_FRAGMENT}
`

export const ACTOR = `
query($_id: ID!) {
  actor(_id: $_id) {
    ...ActorProps
  }
}
${ACTOR_FRAGMENT}
`
