import React from "react"
import makeApiCall from "./utils/makeApiCall"
import { LOGIN_URLS } from "./queries"

export default function useGetLoginUrlsForUser() {
  const [loginUrls, setLoginUrls] = React.useState({ photo: {} })

  React.useEffect(() => {
    makeApiCall({
      query: LOGIN_URLS,
    }).then(({ data }) => setLoginUrls(data.getLoginUrlsForUser))
  }, [])

  return loginUrls
}
