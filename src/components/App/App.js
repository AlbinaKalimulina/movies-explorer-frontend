import { Route, Routes, useLocation } from "react-router-dom";

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

function App() {

  const location = useLocation()

  const loggedIn = ({ pathname }) => Boolean(pathname !== '/')
  const withHeader = ({ pathname }) => Boolean(
    ["/", "/profile", "/movies", "/saved-movies"].includes(pathname)
  )
  const withFooter = ({ pathname }) => Boolean(
    ["/", "/movies", "/saved-movies"].includes(pathname)
  )

  return (
    <div className="page">

      {withHeader(location) ? (<Header loggedIn={loggedIn(location)} />) : ('')}

      <Routes>

        <Route
          path="/"
          element={<Main />} />

        <Route
          path="/signup"
          element={<Register />} />

        <Route
          path="/signin"
          element={<Login />} />

        <Route
          path="/movies"
          element={<Movies />} />

        <Route
          path="/saved-movies"
          element={<SavedMovies />} />

        <Route
          path="/profile"
          element={<Profile />} />

        <Route
          path="*"
          element={<PageNotFound />} />

      </Routes>

      {withFooter(location) ? (<Footer />) : ('')}

    </div>
  );
};

export default App;