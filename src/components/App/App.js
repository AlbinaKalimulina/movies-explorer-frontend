import './App.css';
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";

import Register from "../Register/Register.js";
import Login from "../Login/Login.js";

import Profile from "../Profile/Profile.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";

import PageNotFound from "../PageNotFound/PageNotFound.js";



function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (

      < div className="page__content" >

        <Routes>

          <Route
            path="/"
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Main />
                <Footer />
              </>
            }
          />

          <Route
            path="/signin"
            element={<Login setLoggedIn={setLoggedIn} />} />

          <Route
            path="/signup"
            element={<Register />} />

          <Route
            path="/profile" element={
              <>
                <Header loggedIn={loggedIn} />
                <Profile setLoggedIn={setLoggedIn} />
              </>
            } />

          <Route
            path="/movies"
            element={<Movies />}
          />
          <Route
            path="/saved-movies"
            element={<SavedMovies />}
          />

          <Route
            path="*"
            element={<PageNotFound />}
          />

        </Routes>

      </div >

  );
}

export default App;
