import React, { useEffect, useState } from "react";
import MoviesCardList from "./MoviesCardList/MoviesCardList.js";
import SearchForm from "./SearchForm/SearchForm.js";
import Preloader from "./Preloader/Preloader.js";

import moviesApi from '../../utils/MoviesApi';

function Movies({ savedMovies, onLikeMovie }) {
  const [filteredMovies, setFilteredMovies] = useState([]); // массив отфильтрованных фильмов
  const searchedMovies = localStorage.getItem('searchedMovies'); // данные о поисковом запросе из локального хранилища
  const queries = localStorage.getItem('searchQueryMovies'); // данные об отфильтрованных фильмах из локального хранилища
  const [searchQuery, setSearchQuery] = useState({}); // состояние текущего поискового запроса
  const [isLoading, setIsLoading] = useState(false); // состояние загрузки данных
  const [movies, setMovies] = useState([]); // состояние для хранения полного списка фильмов

  // Загрузка полного списка фильмов из внешнего API при первом поиске
  const fetchMovies = async () => {
    try {
      const moviesData = await moviesApi.getMovies();
      setMovies(moviesData);
      localStorage.setItem('movies', JSON.stringify(moviesData));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Функция для фильтрации фильмов
  const filterMovies = (query) => {
    setIsLoading(true);
    setSearchQuery(query);

    setTimeout(() => {
      let filtered = [];

      localStorage.setItem('searchQueryMovies', JSON.stringify(query));

      if (query.isShortFilmChecked) {
        filtered = movies.filter((m) => m.duration <= 40 && m.nameRU.toLowerCase().trim().includes(query.searchText.toLowerCase()));
      } else {
        filtered = movies.filter((m) => m.nameRU.toLowerCase().trim().includes(query.searchText.toLowerCase()));
      }

      setFilteredMovies(filtered);
      localStorage.setItem('searchedMovies', JSON.stringify(filtered));
      setIsLoading(false);
    }, filteredMovies.length ? 0 : 300);
  };

  // Загрузка фильмов при первом поиске
  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movies'));

    if (storedMovies && storedMovies.length > 0) {
      setMovies(storedMovies);
    } else {
      fetchMovies();
    }
  }, []);

  // Установка отфильтрованных фильмов из локального хранилища
  useEffect(() => {
    if (searchedMovies) {
      setFilteredMovies(JSON.parse(searchedMovies));
    }
  }, [searchedMovies]);

  // Установка текущего поискового запроса из локального хранилища
  useEffect(() => {
    if (queries) {
      setSearchQuery(JSON.parse(queries));
    }
  }, [queries]);

  // Сброс фильтрации и очистка локального хранилища
  const handleResetInput = () => {
    setFilteredMovies([]);
    setSearchQuery({});
    localStorage.removeItem('searchedMovies');
    localStorage.removeItem('searchQueryMovies');
  };

  return (
    <main className="main">
      <section className="movies">
        <SearchForm
          onFilter={filterMovies}
          searchQuery={searchQuery}
          onResetInput={handleResetInput}
          filteredMovies={filteredMovies}
        />

        {isLoading ? <Preloader /> : (
          <>
            {filteredMovies.length ? (
              <MoviesCardList
                movies={filteredMovies}
                savedMovies={savedMovies}
                onLikeMovie={onLikeMovie}
                isLoading={isLoading}
              />
            ) : (
              searchedMovies && (
                <p className="movies__not-found">
                  Ничего не найдено
                </p>
              )
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Movies;