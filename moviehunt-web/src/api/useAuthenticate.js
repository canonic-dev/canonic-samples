import React from "react"
import { AUTHENTICATE } from "./queries"
import makeApiCall from "./utils/makeApiCall"

export default function useAuthenticate() {
  const authenticate = React.useCallback(token => {
    return makeApiCall({
      query: AUTHENTICATE,
      variables: { token },
    }).then(({ data }) => data.authForUser)
  }, [])

  return authenticate
}
