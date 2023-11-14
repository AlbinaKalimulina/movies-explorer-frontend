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

  const withFooter =
    pathname === "/" || pathname === "/movies" || pathname === "/saved-movies";

  const withHeader =
    pathname === "/" ||
    pathname === "/movies" ||
    pathname === "/saved-movies" ||
    pathname === "/profile";

  // стейты для пользователя
  const [currentUser, setCurrentUser] = useState({})//сюда будем класть юзера, его значение по умолчанию объект
  const [loggedIn, setLoggedIn] = useState(false) //отвечает за то, что пользователь залогинился
  const [isLoading, setIsLoading] = useState(false) //отвечает за отправку, изменяется в момент отправки
  const [isCheckToken, setIsCheckToken] = useState(true) //проверяет токен при каждом входе

  // стейты для фильмов
  const [savedMovies, setSavedMovies] = useState([]) // фильмы, сохраненные пользователем, значение по умолчанию массив
  const [allMovies, setAllMovies] = useState([]); // загруженные фильмы при первом поиске
  const [foundMovies, setFoundMovies] = useState([]); // найденные фильмы
  const [savedMoviesList, setSavedMoviesList] = useState([]);


  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([dataUser, dataMovies]) => {
          setCurrentUser(dataUser)
          setSavedMovies(dataMovies)
          setLoggedIn(true)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [loggedIn])


  //проверка наличия у пользователя токена
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
    setFoundMovies([]);
    setAllMovies([]);
    setSavedMovies([]);
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
            element={<Movies />} />

          <Route
            path="/saved-movies"
            element={<SavedMovies />} />


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

        <InfoTooltip isOpen={false} onClose={() => { }} />

      </CurrentUserContext.Provider>
      {/* } */}
    </div>
  );
};

export default App;