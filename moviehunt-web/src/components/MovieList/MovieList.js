import React from "react"

import MovieListItem from "../MovieListItem"
import styles from "./MovieList.module.scss"

function MovieList({
  userId,
  title,
  movies,
  onItemClick,
  onItemUpvote,
  movieIndex,
  onActorClick,
}) {
  return (
    <section className={styles.list}>
      <header className={styles.listTitle}>{title}</header>
      <div className={styles.listItems}>
        {movies
          .sort(
            (a, b) =>
              movieIndex[b].upvotes.length - movieIndex[a].upvotes.length
          )
          .map(movie => (
            <MovieListItem
              key={movie}
              movie={movieIndex[movie]}
              onClick={onItemClick}
              onActorClick={onActorClick}
              onUpvote={onItemUpvote}
              upvoted={(movieIndex[movie].upvotes || []).find(
                u => u._id === userId
              )}
            />
          ))}
      </div>
    </section>
  )
}

export default MovieList
