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

  // фильтрация фильмов на основе запроса
  const applyFilter = (query) => {
    let filtered = [];

    if (query.isShortFilmChecked) {
      filtered = savedMovies.filter((m) => {
        return (
          m.duration <= 40 &&
          m.nameRU.toLowerCase().trim().includes(query.searchText.toLowerCase())
        );
      });
      setFilteredMovies(filtered);
    } else if (!query.isShortFilmChecked) {
      filtered = savedMovies.filter((m) => {
        return m.nameRU.toLowerCase().trim().includes(query.searchText.toLowerCase());
      });
      setFilteredMovies(filtered);
    }
  };

  // сброс фильтрации и возврат к исходному списку фильмов
  const handleResetFilter = () => {
    setFilteredMovies(savedMovies);
    setSearchQuery({});
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
          <MoviesCardList movies={filteredMovies} onDeleteMovie={onDeleteMovie} isSavedMoviesPage={true} />
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