import React, { useState, useEffect } from "react";
import "./App.css";
import {
    Route,
    Switch,
    useRouteMatch,
    useHistory,
    useLocation,
    Redirect,
} from "react-router-dom";

import * as mainApi from "../../utils/MainApi";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import { moviesApi } from "../../utils/MoviesApi";

function App() {
    const history = useHistory();
    const location = useLocation();

    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [allMovies, setAllMovies] = useState([]);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState(
        localStorage.getItem("searchKeyword") || ""
    );

    const hideHeader = ["/not-found", "/signup", "/signin"];
    const hideFooter = ["/not-found", "/profile", "/signup", "/signin"];

    const [profileMessage, setProfileMessage] = useState("");
    const [registerMessage, setRegisterMessage] = useState("");
    const [loginMessage, setLoginMessage] = useState("");

    useEffect(() => {
        if (localStorage.getItem("jwt")) {
            mainApi
                .getUserInfo(localStorage.getItem("jwt"))
                .then(() => {
                    setLoggedIn(true);
                    history.push(location.pathname);
                })
                .catch((err) => {
                    if (err.status === 401) signOut();
                });
        }
    }, []);

    useEffect(() => {
        if (loggedIn) {
            mainApi
                .getUserInfo(localStorage.getItem("jwt"))
                .then((user) => setCurrentUser(user))
                .catch((err) => {
                    console.log(`Ошибка получения данных пользователя: ${err}`);
                });
            mainApi
                .getMovies(localStorage.getItem("jwt"))
                .then((res) => {
                    setSavedMovies(res);
                    localStorage.setItem("savedMovies", JSON.stringify(res));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [loggedIn]);

    const onRegister = ({ name, password, email }) => {
        mainApi
            .signup({ name, password, email })
            .then((res) => {
                if (res) {
                    onLogin({ email, password });
                    setRegisterMessage("Успешная регистрация...");
                }
            })
            .catch((err) => {
                setRegisterMessage("Что-то пошло не так. Попробуйте ещё раз.");
            });
    };

    const onLogin = ({ email, password }) => {
        mainApi
            .signin({ email, password })
            .then((data) => {
                localStorage.setItem("jwt", data.token);
                setLoggedIn(true);
                mainApi.getUserInfo(localStorage.getItem("jwt")).then((res) => {
                    setCurrentUser(res);
                });
                setLoginMessage("Авторизация прошла успешно...");
                history.push("/movies");
            })
            .catch((err) => {
                setLoginMessage("Неправильный логин или пароль. Попробуйте еще раз.");
            });
    };

    const handleUpdateUser = (user) => {
        setIsSubmiting(true);
        mainApi
            .setUserInfo(user, localStorage.getItem("jwt"))
            .then((userInfo) => {
                setProfileMessage("Данные пользователя успешно обновлены");
                setCurrentUser(userInfo.data);
            })
            .catch((err) => {
                setProfileMessage(
                    "Ошибка редактирования данных профиля. Попробуйте ещё раз."
                );
            })
            .finally(() => {
                setIsSubmiting(false);
            });
    };

    const updateFilteredMovies = (allMovies, keyword) => {
        const filteredMovies = allMovies.filter((movie) => {
            return movie.nameRU.toLowerCase().includes(keyword.toLowerCase());
        });
        localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
        setFilteredMovies(filteredMovies);
        setMovies(filteredMovies);
    };

    const handleSearchMovies = (keyword) => {
        setSearchKeyword(keyword);
        localStorage.setItem('searchKeyword', keyword);
        if (localStorage.loadedMovies) {
            updateFilteredMovies(
                JSON.parse(localStorage.getItem("loadedMovies")),
                keyword
            );
        } else {
            setIsLoading(true);
            moviesApi
                .getMoviesAll()
                .then((res) => {
                    localStorage.setItem("loadedMovies", JSON.stringify(res));
                    setAllMovies(allMovies);
                    setAllMovies(JSON.parse(localStorage.getItem("loadedMovies")));
                    updateFilteredMovies(res, keyword);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const signOut = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("savedMovies");
        localStorage.removeItem("filteredMovies");
        localStorage.removeItem("searchKeyword");
        localStorage.removeItem("loadedMovies");
        localStorage.removeItem("checkBoxMovies");
        localStorage.removeItem("checkBoxSaved");
        setLoggedIn(false);
        setCurrentUser({});
        setProfileMessage("");
        setRegisterMessage("");
        setLoginMessage("");
        setIsLoading(false);
        setAllMovies([]);
        setMovies([]);
        setSavedMovies([]);
        setFilteredMovies([]);
        setSearchKeyword("");
        history.push("/");
    };

    const handleSaveMovie = (movie) => {
        mainApi
            .addMovie(movie, localStorage.getItem("jwt"))
            .then((data) => {
                setSavedMovies([data, ...savedMovies]);
                localStorage.setItem(
                    "savedMovies",
                    JSON.stringify([data, ...savedMovies])
                );
            })
            .catch((err) => {
                if (err.status === 401) signOut();
            });
    };

    const handleDeleteMovie = (movie) => {
        const savedMovie = savedMovies.find((m) => m.movieId === movie.movieId);
        mainApi
            .deleteMovie(savedMovie._id, localStorage.getItem("jwt"))
            .then(() => {
                const newMovies = savedMovies.filter((m) => m._id !== savedMovie._id);
                setSavedMovies(newMovies);
            })
            .catch((err) => {
                if (err.status === 401) signOut();
            });
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                {useRouteMatch(hideHeader) ? null : <Header loggedIn={loggedIn} />}

                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>

                    <Route exact path="/signup">
                        {!loggedIn ? (
                            <Register onAuth={onRegister} infoMessage={registerMessage} />
                        ) : (
                            <Redirect to="/" />
                        )}
                    </Route>
                    <Route exact path="/signin">
                        {!loggedIn ? (
                            <Login onAuth={onLogin} infoMessage={loginMessage} />
                        ) : (
                            <Redirect to="/" />
                        )}
                    </Route>

                    <ProtectedRoute
                        path="/movies"
                        exact
                        component={Movies}
                        loggedIn={loggedIn}
                        isLoading={isLoading}
                        movies={movies}
                        onSubmit={handleSearchMovies}
                        onLike={handleSaveMovie}
                        onDislike={handleDeleteMovie}
                        searchKeyword={searchKeyword}
                        savedMovies={savedMovies}
                        setAllMovies={setAllMovies}
                    ></ProtectedRoute>

                    <ProtectedRoute
                        path="/saved-movies"
                        exact
                        component={SavedMovies}
                        loggedIn={loggedIn}
                        isLoading={isLoading}
                        onDislike={handleDeleteMovie}
                        savedMovies={savedMovies}
                        setKeyword={setSearchKeyword}
                    ></ProtectedRoute>

                    <ProtectedRoute
                        path="/profile"
                        exact
                        component={Profile}
                        loggedIn={loggedIn}
                        isSubmiting={isSubmiting}
                        onEditProfile={handleUpdateUser}
                        signOut={signOut}
                        infoMessage={profileMessage}
                    ></ProtectedRoute>

                    <Route path="/not-found">
                        <NotFound />
                    </Route>
                    <Redirect to="/not-found" />
                </Switch>

                {useRouteMatch(hideFooter) ? null : <Footer />}
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
