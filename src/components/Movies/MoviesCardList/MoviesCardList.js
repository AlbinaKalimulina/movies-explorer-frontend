import MoviesCard from "../MoviesCard/MoviesCard.js";
import useScreenResize from '../../../hooks/useScreenResize.js';
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { MOVIES_TO_DISPLAY, SCREEN_SIZES } from '../../../utils/constants.js';

function MoviesCardList({ movies, savedMovies, onSaveMovie, onDeleteMovie, isSavedMoviesPage }) {

  // Хук для отслеживания размера экрана
  let screenSize = useScreenResize();

  // Состояние для отслеживания количества добавленных фильмов
  const [additionalMoviesToAdd, setAdditionalMoviesToAdd] = useState(0);
  const location = useLocation();

  // Сброс количества добавленных фильмов при изменении списка фильмов
  useEffect(() => {
    setAdditionalMoviesToAdd(0);
  }, [movies]);

  // Расчет списка фильмов для отображения с учетом размера экрана и текущей страницы
  const displayedMovies = useMemo(() => {
    if (isSavedMoviesPage) {
      return movies;
    }

    // Определение количества фильмов для отображения в зависимости от размера экрана
    let countToDisplay = MOVIES_TO_DISPLAY.DEFAULT;

    if (screenSize.width <  SCREEN_SIZES.SMALL) {
      countToDisplay = MOVIES_TO_DISPLAY.SMALL_SCREEN;
    }

    if (screenSize.width < SCREEN_SIZES.MOBILE) {
      countToDisplay = MOVIES_TO_DISPLAY.MOBILE_SCREEN;
    }

    return movies.slice(0, countToDisplay + additionalMoviesToAdd);
  }, [movies, additionalMoviesToAdd, screenSize, isSavedMoviesPage]);

  return (
    <section className="card-list">
      <ul className="card-list__container">

        {displayedMovies.map((movie) => {
          return (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              savedMovies={savedMovies}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
            />
          );
        })}
      </ul>

      {location.pathname === '/movies' &&
        movies.length > displayedMovies.length && (
          <button
            onClick={() => {

              // Увеличение количества добавляемых фильмов в зависимости от размера экрана
              setAdditionalMoviesToAdd((prev) => prev + (screenSize.width >= 1241 ? 3 : 2));
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