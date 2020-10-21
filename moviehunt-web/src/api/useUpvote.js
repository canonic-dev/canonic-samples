import React from "react"
import { UPVOTE } from "./queries"
import makeApiCall from "./utils/makeApiCall"

export default function useUpvote() {
  const upvote = React.useCallback(_id => {
    return makeApiCall({
      query: UPVOTE,
      variables: { _id },
    }).then(({ data }) => data.upvoteMovie)
  }, [])

  return upvote
}
