import MoviesCard from "../MoviesCard/MoviesCard.js";
import useResize from '../../../hooks/useResize.js';
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

function MoviesCardList({ movies, savedMovies, onLikeMovie, onDeleteMovie, isSavedMoviesPage }) {
  let size = useResize();
  const [moviesToAdd, setMoviesToAdd] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setMoviesToAdd(0);
  }, [movies]);

  const moviesToRender = useMemo(() => {
    if (isSavedMoviesPage) {
      return movies;
    }
    let countToRender = 12;

    if (size.width < 1240) {
      countToRender = 8;
    }

    if (size.width < 768) {
      countToRender = 5;
    }

    return movies.slice(0, countToRender + moviesToAdd);
  }, [movies, moviesToAdd, size, isSavedMoviesPage]);


  return (
    <section className="card-list">
      <ul className="card-list__container">
        {moviesToRender.map((movie) => {
          return (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              savedMovies={savedMovies}
              onLikeMovie={onLikeMovie}
              onDeleteMovie={onDeleteMovie}
            />
          );
        })}
      </ul>
      {location.pathname === '/movies' &&
        movies.length > moviesToRender.length && (
          <button
            onClick={() => {
              setMoviesToAdd((prev) => prev + (size.width >= 1241 ? 3 : 2));
            }}
            className="card-list__button"
          >
            Еще
          </button>
        )}
    </section>
  );
};

export default MoviesCardList;