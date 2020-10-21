import React from "react";
import Layout from "@src/components/Layout";

import MovieList from "@src/components/MovieList";
import MovieModal from "@src/components/MovieModal";
import useMovies from "@src/api/useMovies";
import useUpvote from "@src/api/useUpvote";

import styles from "./Home.module.scss";

const DEFAULT_MOVIE = { poster: {}, cast: [] };

const Movies = ({ location }) => {
  const {
    movieLists,
    movieIndex,
    setMovieIndex,
    fetchMore,
    noMoreToLoad,
  } = useMovies();
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
      title="Movie Hunt | Home"
      description="MovieHunt is a canonic sample"
      url="https://moviehunt.canonic.dev"
      location={location}
      headerSwitchOffset={300}
      className={styles.home}
      type="AUTH_ONLY"
    >
      {({ user }) => (
        <>
          <div style={{ minHeight: "100vh" }}>
            {movieLists
              .filter((_, i) => noMoreToLoad || i < movieLists.length - 1)
              .map(({ movies, key, title }, i) => (
                <MovieList
                  key={i}
                  userId={user._id}
                  title={title}
                  movies={movies}
                  movieIndex={movieIndex}
                  onItemUpvote={handleUpvote}
                  onItemClick={(movie) => {
                    setActiveMovieId(movie._id);
                    setIsMovieOpen(true);
                  }}
                />
              ))}
          </div>
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
        </>
      )}
    </Layout>
  );
};

export default Movies;
