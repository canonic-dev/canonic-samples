import React from "react"
import { LOGIN } from "./queries"
import makeApiCall from "./utils/makeApiCall"

export default function useLogin() {
  const login = React.useCallback((code, service) => {
    return makeApiCall({
      query: LOGIN,
      variables: { code, service },
    }).then(({ data }) => data.loginForUser)
  }, [])

  return login
}
