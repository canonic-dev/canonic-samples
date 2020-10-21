import React from "react"

import getIndex from "./utils/getIndex"
import usePagination from "./utils/usePagination"
import { MOVIES_FOR_ACTOR } from "./queries"

export default function useMoviesForActor({ actorId }) {
  const [movieIndex, setMovieIndex] = React.useState({})
  const [movies, setMovies] = React.useState([])

  const { fetchMore, noMoreToLoad } = usePagination({
    query: MOVIES_FOR_ACTOR,
    key: "moviesForActor",
    variables: { _id: actorId },
    onFetch: ({ data }) => {
      setMovieIndex(getIndex(data.moviesForActor, movieIndex))
      setMovies([...movies, ...data.moviesForActor.map(({ _id }) => _id)])
    },
  })

  return { movies, movieIndex, setMovieIndex, fetchMore, noMoreToLoad }
}
