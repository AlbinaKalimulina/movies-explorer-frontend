import { Route, Routes, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

import InfoTooltip from "../InfoTooltip/InfoTooltip.js";

import Preloader from "../Movies/Preloader/Preloader.js";

function App() {

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();

  const withFooter =
    pathname === "/" || pathname === "/movies" || pathname === "/saved-movies";

  const withHeader =
    pathname === "/" ||
    pathname === "/movies" ||
    pathname === "/saved-movies" ||
    pathname === "/profile";

  // стейты для пользователя
  const [currentUser, setCurrentUser] = useState({})//сюда будем класть текущего пользователя, его значение по умолчанию объект
  const [loggedIn, setLoggedIn] = useState(false) //статус входа в систему
  const [isLoading, setIsLoading] = useState(false) //отвечает за отправку, изменяется в момент отправки
  // const [isCheckToken, setIsCheckToken] = useState(true) //проверяет токен при каждом входе

  // стейты для фильмов
  const [savedMovies, setSavedMovies] = useState([]) // фильмы, сохраненные пользователем, значение по умолчанию массив

  // ошибки API
  const [apiErrors, setApiErrors] = useState({
    login: {},
    register: {},
    profile: {}
  });

  // Сброс ошибок API при изменении маршрута
  useEffect(() => {
    setApiErrors({
      login: {},
      register: {},
      profile: {}
    });
  }, [location]);


  // Получение информации о пользователе и сохраненных фильмах при входе в систему
  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([dataUser, dataMovies]) => {
          setCurrentUser(dataUser)
          setSavedMovies(dataMovies)
          setLoggedIn(true)
        })
        .catch((error) => {
          // console.log(error)
          console.log(`Что-то пошло не так... (${error})`);
        })
    }
  }, [loggedIn])


  //проверка наличия у пользователя токена
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
  function handleRegister(name, email, password) {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          navigate("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(true));
  }

  // Авторизация пользователя
  function handleLogin(email, password) {
    setIsLoading(true);
    auth
      .login(email, password)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token)
          setLoggedIn(true)
          navigate('/movies')
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(true));
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
        setApiErrors({ ...apiErrors, profile: {} });
      })
      .catch((err) => {
        console.log(err);
        setApiErrors({ ...apiErrors, profile: err });
      })
      .finally(() => setIsLoading(false))
  }


  // useEffect(() => {
  //   loggedIn &&
  //     localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  // }, [savedMovies, loggedIn]);


  // сохранение фильма
  // function handleLikeMovie(movie, isLiked, id) {
  //   if (isLiked) {
  //     handleDeleteMovie(id);
  //   } else {
  //     mainApi
  //       .saveMovie(movie)
  //       .then((res) => {
  //         setSavedMovies([...savedMovies, res]);
  //         localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  //         console.log(res);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };



  function handleLikeMovie(data) {
    const isAdd = savedMovies.some(element => data.id === element.movieId)
    const seachClickMovie = savedMovies.filter((movie) => {
      return movie.movieId === data.id
    })
    if (isAdd) {
      handleDeleteMovie(seachClickMovie[0]._id)
    } else {
      mainApi.addMovie(data, localStorage.jwt)
        .then(res => {
          setSavedMovies([res, ...savedMovies])
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`))
    }
  }


  // удаление фильма
  // function handleDeleteMovie(id) {
  //   const searchedSavedMovies = JSON.parse(
  //     localStorage.getItem('searchedSavedMovies')
  //   );
  //   mainApi
  //     .deleteMovie(id)
  //     .then((res) => {
  //       const updatedSavedMovies = savedMovies.filter(
  //         (movie) => movie._id !== id
  //       );
  //       setSavedMovies(updatedSavedMovies);
  //       if (searchedSavedMovies) {
  //         const updatedSearchedSavedMovies = searchedSavedMovies.filter(
  //           (movie) => movie._id !== id
  //         );

  //         localStorage.setItem(
  //           'searchedSavedMovies',
  //           JSON.stringify(updatedSearchedSavedMovies)
  //         );
  //       }
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  // };

  function handleDeleteMovie(deletemovieId) {
    mainApi.deleteMovie(deletemovieId, localStorage.jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => { return movie._id !== deletemovieId }))
      })
      .catch((err) => console.error(`Ошибка при удалении фильма ${err}`))
  }


  return (
    <div className="page">

      {/* {isCheckToken ? <Preloader /> : */}

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
              apiErrors={apiErrors}
            />
          } />

          <Route path="/signin" element={
            <Login
              onLogin={handleLogin}
              isLoading={isLoading}
              apiErrors={apiErrors}
            />
          } />

          <Route
            path="/movies"
            element={<Movies />}
            isLoading={isLoading}
            savedMovies={savedMovies}
            onLikeMovie={handleLikeMovie}
          />

          <Route
            path="/saved-movies"
            element={<SavedMovies />}
            isLoading={isLoading}
            savedMovies={savedMovies}
            onDeleteMovie={handleDeleteMovie}
          />


          <Route path="/profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}
                element={Profile}
                isLoading={isLoading}
                onUpdateUser={handleUpdateUser}
                onSignout={handleSignOut}
                apiErrors={apiErrors}
              />}
          />

          <Route
            path="*"
            element={<PageNotFound />} />

        </Routes>

        {withFooter && <Footer />}

        <InfoTooltip isOpen={false} onClose={() => { }} />

      </CurrentUserContext.Provider>
      {/* } */}
    </div>
  );
};

export default App;