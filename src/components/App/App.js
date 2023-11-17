import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";

import Register from "../Register/Register.js";
import Login from "../Login/Login.js";

import Profile from "../Profile/Profile.js";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies.js";

import PageNotFound from "../PageNotFound/PageNotFound.js";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js"

import mainApi from "../../utils/MainApi.js";
import * as auth from "../../utils/auth.js";

function App() {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const withFooter =
    pathname === "/" || pathname === "/movies" || pathname === "/saved-movies";

  const withHeader =
    pathname === "/" ||
    pathname === "/movies" ||
    pathname === "/saved-movies" ||
    pathname === "/profile";

  // стейты для пользователя
  const [currentUser, setCurrentUser] = useState({})//сюда будем класть текущего пользователя, его значение по умолчанию объект
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token')) //статус входа в систему
  const [isLoading, setIsLoading] = useState(false) //отвечает за отправку, изменяется в момент отправки

  // стейты для фильмов
  const [savedMovies, setSavedMovies] = useState([]) // фильмы, сохраненные пользователем, значение по умолчанию массив

  // Получение информации о пользователе и сохраненных фильмах при входе в систему
  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([dataUser, dataMovies]) => {
          setCurrentUser(dataUser)
          setSavedMovies(dataMovies)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [loggedIn])


  // Проверка токена при загрузке приложения для автоматического входа
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser({
            name: res.name,
            email: res.email,
            _id: res._id
          });
        })
        .catch((err) => {
          localStorage.removeItem('token');
          console.log(err)
        });
    }
  }, []);

  // Регистрация пользователя
  function handleRegister(data) {
    setIsLoading(true);
    auth
      .register(data)
      .then(() => {
        handleLogin(data);
      })

      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  // Авторизация пользователя
  function handleLogin(data) {
    setIsLoading(true);
    auth
      .login({ email: data.email, password: data.password })
      .then((res) => {
        if (res && res.token) {
          setLoggedIn(true)
          localStorage.setItem('token', res.token)
          navigate('/movies', { replace: true })
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  //Выход из системы, удаляем всё из localStorage
  function handleSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({ name: "", email: "", _id: "" });
    navigate("/");
  }

  // Обновление данных пользователя
  function handleUpdateUser(name, email) {
    setIsLoading(true);
    mainApi.setUserInfo(name, email)
      .then((res) => {
        //обновляем стейт currentUser из полученных данных
        setCurrentUser({
          name: res.name,
          email: res.email
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false))
  }

  // Сохранение фильма
  function handleSaveMovie(movie) {
    const isSaved = savedMovies.some(element => movie.id === element.movieId);
    if (!isSaved) {
      mainApi
        .addMovie(movie, localStorage.token)
        .then((res) => {
          setSavedMovies([res, ...savedMovies])
        })
        .catch((err) => {
          console.error(err);
        })
    } else {
      const seachSavedMovie = savedMovies.filter((element) => {
        return element.movieId === movie.id
      })
      handleDeleteMovie(seachSavedMovie[0]._id)
    }
  }

  //Удаление фильма
  function handleDeleteMovie(savedMovieId) {
    mainApi
      .deleteMovie(savedMovieId, localStorage.token)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => {
          return movie._id !== savedMovieId
        }))
      })
      .catch((err) => {
        console.error(err);
      })
  }


  return (
    <div className="page">

      <CurrentUserContext.Provider value={currentUser}>

        {withHeader && <Header loggedIn={loggedIn} />}

        <Routes>

          <Route
            path="/"
            element={<Main />} />

          <Route path="/signup" element={
            <Register
              onRegister={handleRegister}
              isLoading={isLoading}
            />
          } />

          <Route path="/signin" element={
            <Login
              onLogin={handleLogin}
              isLoading={isLoading}
            />
          } />

          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}
                element={Movies}
                isLoading={isLoading}
                savedMovies={savedMovies}
                onSaveMovie={handleSaveMovie}
              />}
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}
                element={SavedMovies}
                isLoading={isLoading}
                savedMovies={savedMovies}
                onDeleteMovie={handleDeleteMovie}
              />}
          />


          <Route path="/profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}
                element={Profile}
                isLoading={isLoading}
                onUpdateUser={handleUpdateUser}
                onSignout={handleSignOut}
              />}
          />

          <Route
            path="*"
            element={<PageNotFound />} />

        </Routes>

        {withFooter && <Footer />}

      </CurrentUserContext.Provider>

    </div>
  );
};

export default App;
