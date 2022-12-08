import React, { useState, useEffect } from "react";
import './App.css';
import {Route, Switch, useRouteMatch, useHistory, useLocation, Redirect } from 'react-router-dom';

import * as mainApi from '../../utils/MainApi';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
// import { addMovie } from "../../utils/MainApi";


function App() {
    const history = useHistory();
    const location = useLocation();

    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [allMovies, setAllMovies] = useState(
        JSON.parse(localStorage.getItem('loadedMovies')) || []
    );
    const [filteredMovies, setFilteredMovies] = useState(
        JSON.parse(localStorage.getItem('filteredMovies')) || []
    );
    const [searchKeyword, setSearchKeyword] = useState(
        localStorage.getItem('searchKeyword') || ''
    );

    // // вот тут разобаться с роутингом = это по-новому 6-й версии
    // const { pathname } = useLocation();
    // const isHeaderVisible = matchPath({ path: '/', exact: true }, pathname) || matchPath({ path: '/movies', exact: true }, pathname) || matchPath({ path: '/saved-movies', exact: true }, pathname) || matchPath({ path: '/profile', exact: true }, pathname);
    // const isFooterVisible = matchPath({ path: '/', exact: true }, pathname) || matchPath({ path: '/movies', exact: true }, pathname) || matchPath({ path: '/saved-movies', exact: true }, pathname);

    const hideHeader = ['/not-found', '/signup', '/signin'];
    const hideFooter = ['/not-found','/profile', '/signup', '/signin'];

    const [profileMessage, setProfileMessage] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    useEffect(() => {

        if (localStorage.getItem('jwt')) {
            // проверяем, есть ли токен в localStorage = потом удалить надо
            // console.log('log from use effect');
            // console.log(localStorage.getItem('jwt'));

            mainApi
                .getUserInfo(localStorage.getItem('jwt'))
                .then(() => {
                    setLoggedIn(true);
                    history.push(location.pathname);
                })
                .catch((err) => console.log(err));
        }
    }, []);

    useEffect(() => {
        if (loggedIn) {
            // проверяем, есть ли токен в localStorage = потом удалить надо
            // console.log('log from use effect');
            // console.log(localStorage.getItem('jwt'));

            mainApi
                .getUserInfo(localStorage.getItem('jwt'))
                .then((user) => setCurrentUser(user))
                .catch((err) => {
                    console.log(`Ошибка получения данных пользователя: ${err}`);
                });
            mainApi
                .getMovies(localStorage.getItem('jwt'))
                .then((res) => {
                    localStorage.setItem('savedMovies', JSON.stringify(res));
                })
                .catch((err) => {
                    console.log(err);
                });
            if (localStorage.getItem('savedMovies')) {
                setSavedMovies(filteredMovies)
            }
        }
    }, [loggedIn, filteredMovies])

    const onRegister = ({ name, password, email }) => {
        mainApi
            .signup ({ name, password, email })
            .then((res) => {
                if (res) {
                    onLogin({ email, password });
                    setRegisterMessage('Успешная регистрация...');
                }
            })
            .catch ((err) => {
                setRegisterMessage('Что-то пошло не так. Попробуйте ещё раз.');
            })
    }

    const onLogin = ({ email, password }) => {
        mainApi
            .signin ({ email, password })
            .then ((data) => {
                localStorage.setItem('jwt', data.token);
                setLoggedIn(true);
                mainApi.getUserInfo(localStorage.getItem('jwt'))
                    .then((res) => {
                        setCurrentUser(res);
                    });
                setLoginMessage('Авторизация прошла успешно...');
                history.push('/movies');
            })
            .catch ((err) => {
                setLoginMessage('Неправильный логин или пароль. Попробуйте еще раз.');
            })
    }

    const handleUpdateUser = (user) => {
        mainApi
            .setUserInfo (user, localStorage.getItem('jwt'))
            .then ((userInfo) => {
                setProfileMessage('Данные пользователя успешно обновлены');
                setCurrentUser(userInfo);
            })
            .catch ((err) => {
                setProfileMessage('Ошибка редактирования данных профиля. Попробуйте ещё раз.');
            })
    }

    // поиск фильмов по ключевому слову в регистронезависимом режиме
    const searchMovies = (movie, name) => {
        return movie.filter((movie) =>
            movie.nameRU.toLowerCase().includes(name.toLowerCase())
        );
    }
    const handleSearchMovies = (name) => {
        setIsLoading(true);
        const newMovies = searchMovies(allMovies, name);
        setMovies(newMovies);
        localStorage.setItem('filteredMovies', JSON.stringify(newMovies));
        setFilteredMovies(newMovies);
        localStorage.setItem('searchKeyword', name);
        setSearchKeyword(name);
        setTimeout(() => setIsLoading(false), 1000);
    }

    const signOut = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('savedMovies');
        localStorage.removeItem('filteredMovies');
        localStorage.removeItem('searchKeyword');
        localStorage.removeItem('loadedMovies');
        localStorage.removeItem('checkBox');
        setLoggedIn(false);
        setCurrentUser({});
        setProfileMessage('');
        setRegisterMessage('');
        setLoginMessage('');
        setIsLoading(false);
        setAllMovies([]);
        setMovies([]);
        setSavedMovies([]);
        setFilteredMovies([]);
        setSearchKeyword('');
        history.push('/');
    }

    // сохранение фильма в личном кабинете пользователя и в localStorage
    const handleSaveMovie = (movie) => {
        mainApi
            .addMovie(movie, localStorage.getItem('jwt'))
            .then((data) => {
                setSavedMovies([data, ...savedMovies]);
                localStorage.setItem(
                    "savedMovies",
                    JSON.stringify([data, ...savedMovies])
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleDeleteMovie = (movie) => {
        const savedMovie = savedMovies.find((m) => m.movieId === movie.movieId);
        mainApi
            .deleteMovie(savedMovie._id, localStorage.getItem('jwt'))
            .then(() => {
                const newMovies = savedMovies.filter(
                    (m) => m._id !== savedMovie._id
                );
                setSavedMovies(newMovies);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <CurrentUserContext.Provider
            value={currentUser}>

        <div className="app">
            {useRouteMatch(hideHeader) ? null :
                ( <Header loggedIn={loggedIn}/>
                )}

            <Switch>
                <Route exact path="/">
                    <Main />
                    {/*<Main loggedIn={loggedIn}/>*/}
                </Route>

                <Route path='/signup'>
                    <Register
                        onAuth={onRegister}
                        infoMessage={registerMessage}
                    />
                </Route>

                <Route path='/signin'>
                    <Login
                        onAuth={onLogin}
                        infoMessage={loginMessage}/>
                </Route>

                <ProtectedRoute
                    path='/movies'
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
                >
                </ProtectedRoute>

                <ProtectedRoute
                    path='/saved-movies'
                    exact
                    component={SavedMovies}
                    loggedIn={loggedIn}
                    isLoading={isLoading}
                    onDislike={handleDeleteMovie}
                    savedMovies={savedMovies}
                    setKeyword={setSearchKeyword}
                >
{/*<SavedMovies loggedIn={loggedIn} />*/}
                </ProtectedRoute>

                <ProtectedRoute
                    path='/profile'
                    exact
                    component={Profile}
                    loggedIn={loggedIn}
                    onEditProfile={handleUpdateUser}
                    signOut={signOut}
                    infoMessage={profileMessage}
                >
                </ProtectedRoute>

                <Route path='/not-found'>
                    <NotFound />
                </Route>
                <Redirect to='/not-found'/>
            </Switch>

            {useRouteMatch(hideFooter) ? null : <Footer />}
        </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

// удалил стары ретюрн
