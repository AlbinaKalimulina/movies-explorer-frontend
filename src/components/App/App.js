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
import imageSuccess from "../../images/image_success.svg";
import imageError from '../../images/image_error.svg';

import Preloader from "../Movies/Preloader/Preloader.js";

function App() {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  // const location = useLocation()

  // const loggedIn = ({ pathname }) => Boolean(pathname !== '/')
  // const withHeader = ({ pathname }) => Boolean(
  //   ["/", "/profile", "/movies", "/saved-movies"].includes(pathname)
  // )
  // const withFooter = ({ pathname }) => Boolean(
  //   ["/", "/movies", "/saved-movies"].includes(pathname)
  // )

  const withHeader = ["/movies", "/saved-movies", "/profile", "/"];
  const withFooter = ["/movies", "/saved-movies", "/"];

  // const withFooter =
  //   pathname === "/" || pathname === "/movies" || pathname === "/saved-movies";

  // const withHeader =
  //   pathname === "/" ||
  //   pathname === "/movies" ||
  //   pathname === "/saved-movies" ||
  //   pathname === "/profile";

  // стейты для пользователя
  const [currentUser, setCurrentUser] = useState({})//сюда будем класть юзера, его значение по умолчанию объект
  const [loggedIn, setLoggedIn] = useState(false) //отвечает за то, что пользователь залогинился
  const [isLoading, setIsLoading] = useState(false) //отвечает за отправку, изменяется в момент отправки
  const [isCheckToken, setIsCheckToken] = useState(true) //проверяет токен при каждом входе
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false)//отображает статус "успешно" при редактировании профиля (уведомляет пользователя о результате запроса к серверу)
 // const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  // const [infoTooltipImage, setInfoTooltipImage] = useState(imageSuccess);
  // const [message, setMessage] = useState('');


   // стейты для фильмов
  const [savedMovies, setSavedMovies] = useState([]) // фильмы, сохраненные пользователем, значение по умолчанию массив
  const [allMovies, setAllMovies] = useState([]); // загруженные фильмы при первом поиске
  const [foundMovies, setFoundMovies] = useState([]); // найденные фильмы
  const [savedMoviesList, setSavedMoviesList] = useState([]);


  //   useEffect(() => {
  //     tokenCheck();
  // }, []);

  useEffect(() => {
    // console.log(localStorage)
    // if (loggedIn)
    if (localStorage.token) {
      console.log(localStorage)
      Promise.all([mainApi.getUserInfo(localStorage.token), mainApi.getSavedMovies(localStorage.token)])
        .then(([dataUser, dataMovies]) => {
          setCurrentUser(dataUser)
          setSavedMovies(dataMovies.reverse())
          setLoggedIn(true)
          setIsCheckToken(false)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [loggedIn])


  // Авторизация пользователя
  function handleLogin(email, password) {
    setIsLoading(true);
    auth
      .login(email, password)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true)
          navigate('/movies')
          window.scrollTo(0, 0)
          // .checkToken();
        }
      })
      .catch((err) => {
        setIsInfoTooltipSuccess(false);
        // setIsInfoTooltipPopup(true);
        console.log(err);
      })
      .finally(() => setIsLoading(true));
  }

  // Регистрация пользователя
  function handleRegister(name, email, password) {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          setIsInfoTooltipSuccess(true);
          navigate("/signin");
        }
      })
      .catch((err) => {
        setIsInfoTooltipSuccess(false);
        console.log(err);
      })
      .finally(() => setIsLoading(true));
  }

  //проверка наличия у пользователя токена

  // function tokenCheck() {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     mainApi.getUserInfo()
  //       .then((res) => {
  //         if (res) {
  //           setCurrentUser({
  //             name: res.name,
  //             email: res.email,
  //             _id: res._id
  //           });
  //           setLoggedIn(true);
  //         }
  //       })
  //       .catch((err) => {
  //         if (err.status === 401) {
  //           handleSignOut();
  //         } else {
  //           handleSignOut();
  //         }
  //       });
  //   }
  // }


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
          // navigate("/movies");
        })
        .catch((err) => {
          localStorage.removeItem('token');
          console.log(err)
        });
    }
  }, [navigate]);

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
  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    mainApi.updateUserInfo({ name, email }, localStorage.token)
      .then((res) => {
        //обновляем стейт currentUser из полученных данных
        setCurrentUser({
          name: res.name,
          email: res.email
        });

        //Попап успешного редактирования
        // setInfoTooltipImage(imageSuccess);
        // setMessage('Вы успешно изменили данные!');
        // setInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(err);

        //Попап ошибки редактирования
        // setInfoTooltipImage(imageError);
        // setMessage('Что-то пошло не так! Попробуйте ещё раз.');
        // setInfoTooltipOpen(true);
      })
      .finally(() => setIsLoading(false))
  }

  // Закрытие попапов
  function closeAllPopups() {
    // setInfoTooltipOpen(false);
  }


  return (
    // <CurrentUserContext.Provider value={currentUser}>
    <div className="page">

{/* {isCheckToken ? <Preloader /> : */}

      <CurrentUserContext.Provider value={currentUser}>
        {/* {withHeader(location) ? (<Header loggedIn={loggedIn(location)} />) : ('')} */}
        {/* {withHeader && <Header setLoggedIn={setLoggedIn} newEntrance={handleEntranceOnProfile}/>} */}
        {withHeader && <Header setLoggedIn={setLoggedIn} />}

        <Routes>

          <Route
            path="/"
            element={<Main />} />

          {/* <Route
            path="/signup"
            element={<Register />} /> */}

          <Route path="/signup" element={
            <Register
              onRegister={handleRegister}
              isLoading={isLoading}
            // registerError={registerError}
            />
          } />
          {/*
          <Route
            path="/signin"
            element={<Login />} /> */}

          <Route path="/signin" element={
            <Login
              onLogin={handleLogin}
              isLoading={isLoading}
            // loginError={loginError}
            />
          } />

          <Route
            path="/movies"
            element={<Movies />} />

          <Route
            path="/saved-movies"
            element={<SavedMovies />} />

          {/* <Route
            path="/profile"
            element={<Profile />} /> */}

          <Route path="/profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}
                element={Profile}
                // onEditProfile={handleClickEditProfile}
                // onUpdate={handleUpdateUser}
                // updateError={updateError}
                // isEditingProfile={isEditingProfile}
                // isNewEntranceOnPage={isNewEntranceOnPage}

                onUpdateUser={handleUpdateUser}
                isLoading={isLoading}
                onSignout={handleSignOut}
              />}
          />

          <Route
            path="*"
            element={<PageNotFound />} />

        </Routes>

        {/* {withFooter(location) ? (<Footer />) : ('')} */}
        {withFooter && <Footer />}

        {/* <InfoTooltip
          isOpen={infoTooltipOpen}
          onClose={closeAllPopups}
          image={infoTooltipImage}
          message={message}
        /> */}

        {/* <InfoTooltip isOpen={false} onClose={() => { }} message={error} /> */}
        <InfoTooltip isOpen={false} onClose={() => { }} />

        </CurrentUserContext.Provider>
         {/* } */}
    </div>
    // </CurrentUserContext.Provider >
  );
};

export default App;