import React from "react";
import dayjs from "dayjs";
import Layout from "@src/components/Layout";
import truncate from "lodash.truncate";

import MovieList from "@src/components/MovieList";
import MovieModal from "@src/components/MovieModal";
import useMoviesForActor from "@src/api/useMoviesForActor";
import useUpvote from "@src/api/useUpvote";
import useActor from "@src/api/useActor";

import styles from "./Actor.module.scss";

const DEFAULT_MOVIE = { poster: {}, cast: [] };

const Actor = ({ location }) => {
  const actorId = location.pathname.split("/").pop();
  const { actor } = useActor(actorId);
  const {
    movies,
    movieIndex,
    setMovieIndex,
    fetchMore,
    noMoreToLoad,
  } = useMoviesForActor({ actorId });

  const upvote = useUpvote();
  const [activeMovieId, setActiveMovieId] = React.useState(DEFAULT_MOVIE);
  const [isMovieOpen, setIsMovieOpen] = React.useState(false);
  const activeMovie = movieIndex[activeMovieId] || DEFAULT_MOVIE;

  const handleUpvote = React.useCallback((movie, e) => {
    e.stopPropagation();
    upvote(movie._id).then((movie) => {
      setMovieIndex((movieIndex) => ({
        ...movieIndex,
        [movie._id]: movie,
      }));
    });
  }, []);

  return (
    <Layout
      title="Movie Hunt | Actor"
      description="MovieHunt is a canonic sample"
      url="https://moviehunt.canonic.dev"
      location={location}
      headerSwitchOffset={300}
      className={styles.actor}
      type="AUTH_ONLY"
    >
      {({ user }) => (
        <>
          <header>
            <div className={styles.actorHeader}>
              <div className={styles.actorHeaderAvatar}>
                <img src={actor.photo.url} />
              </div>
              <div className={styles.actorHeaderText}>
                <div className={styles.actorHeaderTextTitle}>{actor.title}</div>
                <div className={styles.actorHeaderTextBirthday}>
                  Born: {dayjs(actor.birthday).format("DD, MMMM, YYYY")} @{" "}
                  {actor.birthPlace}
                </div>
                <div
                  className={styles.actorHeaderTextBio}
                  dangerouslySetInnerHTML={{
                    __html: truncate(actor.biography || "", { length: 400 }),
                  }}
                />
              </div>
            </div>
          </header>
          <div>
            <MovieList
              title="Movies"
              movies={movies}
              movieIndex={movieIndex}
              userId={user._id}
              onItemUpvote={handleUpvote}
              onItemClick={(movie) => {
                setActiveMovieId(movie._id);
                setIsMovieOpen(true);
              }}
            />
            {noMoreToLoad ? null : (
              <button className={styles.button} onClick={fetchMore}>
                Fetch more
              </button>
            )}
            <MovieModal
              active={isMovieOpen}
              onClose={() => setIsMovieOpen(false)}
              movie={activeMovie}
            />
          </div>
        </>
      )}
    </Layout>
  );
};

export default Actor;
