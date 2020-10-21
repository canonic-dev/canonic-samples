import React from "react"
import makeApiCall from "./makeApiCall"

export default function usePagination({ query, variables = {}, onFetch, key }) {
  const [noMoreToLoad, setNoMoreToLoad] = React.useState(false)
  const [page, setPage] = React.useState(0)

  const fetchMore = React.useCallback(() => {
    const offset = window.pageYOffset
    makeApiCall({
      query,
      variables: {
        limit: 10,
        page: page + 1,
        ...variables,
      },
    })
      .then(data => {
        if (data.data[key].length === 0) setNoMoreToLoad(true)
        onFetch(data)
      })
      .then(() => setPage(page => page + 1))
      .then(() => window.scrollTo(0, offset))
  })

  React.useEffect(() => {
    makeApiCall({
      query,
      variables: {
        limit: 10,
        page: 0,
        ...variables,
      },
    }).then(onFetch)
  }, [])

  return { fetchMore, noMoreToLoad }
}
