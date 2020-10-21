import React from "react"
import makeApiCall from "./utils/makeApiCall"
import { ACTOR } from "./queries"

export default function useActor(actorId) {
  const [actor, setActor] = React.useState({ photo: {} })

  React.useEffect(() => {
    makeApiCall({
      query: ACTOR,
      variables: { _id: actorId },
    }).then(({ data }) => setActor(data.actor))
  }, [])

  return { actor }
}
