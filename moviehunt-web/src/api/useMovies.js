import React from "react"

import bucketMovies from "./utils/bucketMovies"
import getIndex from "./utils/getIndex"
import usePagination from "./utils/usePagination"
import { MOVIES } from "./queries"

export default function useMovies() {
  const [movieIndex, setMovieIndex] = React.useState({})
  const [movieLists, setMovieLists] = React.useState([])

  const { fetchMore, noMoreToLoad } = usePagination({
    query: MOVIES,
    key: "movies",
    onFetch: ({ data }) => {
      setMovieIndex(getIndex(data.movies, movieIndex))
      setMovieLists(
        bucketMovies([
          ...Object.keys(movieIndex).map(k => movieIndex[k]),
          ...data.movies,
        ])
      )
    },
  })

  return { movieLists, movieIndex, setMovieIndex, fetchMore, noMoreToLoad }
}
