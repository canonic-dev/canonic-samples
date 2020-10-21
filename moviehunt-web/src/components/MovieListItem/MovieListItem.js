import React from "react"
import Link from "gatsby-plugin-transition-link"
import styles from "./MovieListItem.module.scss"

function MovieListItem({ movie, onClick, onUpvote, upvoted }) {
  const upvotedClassName = upvoted ? styles.upvoted : ""
  return (
    <article onClick={e => onClick(movie, e)} className={styles.listItem}>
      <div
        onClick={e => onUpvote(movie, e)}
        className={`${styles.listItemUpvote} ${upvotedClassName}`}
      >
        <div className={styles.listItemUpvoteCount}>
          <strong>⬆</strong> {movie.upvotes.length}
        </div>
      </div>
      <div className={styles.listItemImageCover}>
        <img src={movie.poster.url} />
      </div>
      <div className={styles.listItemImage}>
        <img src={movie.poster.url} />
      </div>
      <div className={styles.listItemText}>
        <div className={styles.listItemTextTitle}>{movie.title}</div>
        <div className={styles.listItemTextStats}>
          {movie.rating > 0 && (
            <div className={styles.listItemTextStatsRating}>{movie.rating}</div>
          )}
          <div className={styles.listItemTextStatsGenres}>
            {movie.genres
              .filter((_, i) => i < 3)
              .map(({ label, value }) => (
                <div className={styles.listItemTextStatsGenresItem}>
                  {label}
                </div>
              ))}
          </div>
        </div>
        <div
          className={styles.listItemTextSummary}
          dangerouslySetInnerHTML={{ __html: movie.summary }}
        />

        <div className={styles.listItemTextFooter}>
          <div className={styles.listItemTextCast}>
            {movie.cast
              .filter(
                ({ actor }) =>
                  actor &&
                  actor.photo &&
                  actor.photo.url &&
                  !actor.photo.url.includes("null")
              )
              .filter((_, i) => i < 5)
              .map(({ _id, title, actor }) => (
                <div
                  title={actor.title}
                  onClick={e => e.stopPropagation()}
                  key={_id}
                  className={styles.listItemTextCastItem}
                >
                  <Link
                    to={`/actors/${actor._id}`}
                    entry={{ length: 0.3 }}
                    exit={{ length: 0.3 }}
                  >
                    <img src={actor.photo.url ? actor.photo.url : ""} />
                  </Link>
                </div>
              ))}
          </div>
          <div className={styles.listItemTextCta}>⬅</div>
        </div>
      </div>
    </article>
  )
}

export default MovieListItem
