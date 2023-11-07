import React from "react";
import MoviesCardList from "./MoviesCardList/MoviesCardList.js";
import SearchForm from "./SearchForm/SearchForm.js";
import Preloader from "./Preloader/Preloader.js";

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList />
      <Preloader />
    </section>
  )
}

export default Movies;