class MainApi {

  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(this._checkResponse)
    // .catch(console.log("getUserInfo fetch error"))
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      })
    })
      .then(this._checkResponse)
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(this._checkResponse)
    // .catch(console.log("getSavedMovies fetch error"))
  }


  addMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        description: data.description,
        year: data.year,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    })
      .then(this._checkResponse)
      .catch((error) => console.log("addMovie fetch error", error));
  }

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(this._checkResponse)
      .catch((error) => console.log("deleteMovie fetch error", error));
  }

}

const mainApi = new MainApi({
  // baseUrl: 'https://api.albina-movies.nomoredomainsrocks.ru',
  baseUrl: 'http://127.0.0.1:3000',
});

export default mainApi;