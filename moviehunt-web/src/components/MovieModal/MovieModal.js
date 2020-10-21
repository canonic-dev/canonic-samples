import React from "react"
import Modal from "@src/components/Modal"
import styles from "./MovieModal.module.scss"

const MovieModal = ({ movie, active, onClose }) => {
  return (
    <Modal active={active} onClose={onClose}>
      <div className={styles.movie}>
        <div className={styles.movieHeader}>
          <div className={styles.movieHeaderImage}>
            <img src={movie.poster.url} />
          </div>
          <div className={styles.movieHeaderText}>
            <div className={styles.movieHeaderTextTitle}>{movie.title}</div>
            <div className={styles.movieHeaderTextStats}></div>
            <div
              className={styles.movieHeaderTextSummary}
              dangerouslySetInnerHTML={{ __html: movie.summary }}
            />
          </div>
        </div>
        {movie.trailers && movie.trailers[0] ? (
          <div className={styles.movieTrailer}>
            <div className={styles.movieTrailerHeader}>Trailer</div>
            <div className={styles.movieTrailerEmbed}>
              <iframe
                width="100%"
                height="100%"
                noBorder
                src={`https://www.youtube.com/embed/${movie.trailers[0].value}`}
              ></iframe>
            </div>
          </div>
        ) : null}
        <div className={styles.movieCast}>
          <div className={styles.movieCastHeader}>Cast</div>
          <div className={styles.movieCastItems}>
            {movie.cast
              .filter(
                ({ actor }) =>
                  actor.photo.url && !actor.photo.url.includes("null")
              )
              .map(cast => (
                <div className={styles.cast}>
                  <div className={styles.castImage}>
                    <img src={cast.actor.photo.url} />
                  </div>
                  <div className={styles.castText}>
                    <div className={styles.castTextTitle}>
                      {cast.actor.title}
                    </div>
                    <div className={styles.castTextSummary}>
                      {cast.character}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default MovieModal
