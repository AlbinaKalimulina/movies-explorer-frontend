import React, { useEffect, useState } from "react";
import SearchForm from "../Movies/SearchForm/SearchForm.js";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList.js";

function SavedMovies({ savedMovies, onDeleteMovie }) {
  const [filteredMovies, setFilteredMovies] = useState([]); //хранение отфильтрованных фильмов

  const searchedMovies = localStorage.getItem('searchedSavedMovies');

  const [searchQuery, setSearchQuery] = useState({});  //сохранение текущего запроса поиска

   // обновление списка отфильтрованных фильмов при изменении результатов поиска
  useEffect(() => {
    if (searchedMovies) {
      setFilteredMovies(JSON.parse(searchedMovies));
    } else {
      setFilteredMovies(savedMovies);
    }
  }, [searchedMovies, savedMovies]);

  useEffect(() => {
    // проверка наличия поискового запроса при первой загрузке страницы
    const initialSearchQuery = JSON.parse(localStorage.getItem('initialSearchQuery'));
    if (!initialSearchQuery) {
      setFilteredMovies(savedMovies);
    }

    // добавление обработчика события перед выгрузкой страницы
    const handleBeforeUnload = () => {
      localStorage.removeItem('searchedSavedMovies');
      localStorage.removeItem('initialSearchQuery');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [savedMovies]);

  // фильтрация фильмов на основе запроса
  const applyFilter = (query) => {
    let filtered = [];

    if (query.isShortFilmChecked) {
      filtered = savedMovies.filter((m) => (
        m.duration <= 40 &&
        m.nameRU.toLowerCase().trim().includes(query.searchText.toLowerCase())
      ));
    } else {
      filtered = savedMovies.filter((m) => (
        m.nameRU.toLowerCase().trim().includes(query.searchText.toLowerCase())
      ));
    }

    setFilteredMovies(filtered);
    setSearchQuery(query);

    // сохранение отфильтрованных фильмов в localStorage только при наличии поискового запроса
    if (query.searchText) {
      localStorage.setItem('searchedSavedMovies', JSON.stringify(filtered));
      localStorage.setItem('initialSearchQuery', JSON.stringify(query));
    } else {
      localStorage.removeItem('searchedSavedMovies');
      localStorage.removeItem('initialSearchQuery');
    }
  };

  // сброс фильтрации и возврат к исходному списку фильмов
  const handleResetFilter = () => {
    setFilteredMovies(savedMovies);
    setSearchQuery({});
    localStorage.removeItem('searchedSavedMovies');
    localStorage.removeItem('initialSearchQuery');
  };

  const handleDeleteMovie = (movieId) => {
    onDeleteMovie(movieId);

    // обновление отфильтрованных фильмов в зависимости от наличия поискового запроса
    if (searchQuery.searchText) {
      const updatedFilteredMovies = filteredMovies.filter((movie) => movie._id !== movieId);
      setFilteredMovies(updatedFilteredMovies);
      localStorage.setItem('searchedSavedMovies', JSON.stringify(updatedFilteredMovies));
    } else {
      const updatedSavedMovies = savedMovies.filter((movie) => movie._id !== movieId);
      setFilteredMovies(updatedSavedMovies);
      localStorage.setItem('searchedSavedMovies', JSON.stringify(updatedSavedMovies));
    }
  };

  return (
    <main className="main">
      <section className="saved-movies">
        <SearchForm
          onFilter={applyFilter}
          searchQuery={searchQuery}
          onResetInput={handleResetFilter}
          filteredMovies={filteredMovies}
        />
        {filteredMovies.length ? (
          <MoviesCardList movies={filteredMovies} onDeleteMovie={handleDeleteMovie} isSavedMoviesPage={true} />
        ) : (
          searchedMovies && (
            <p className="movies__not-found">
              Ничего не найдено
            </p>
          )
        )}
      </section>
    </main>
  );
}

export default SavedMovies;