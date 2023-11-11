import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList() {
  return (
    <div className="card-list">
      <ul className="card-list__container">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button className="card-list__button" type="button">Ещё</button>
    </div>
  );
}

export default MoviesCardList;