import React from "react";
import "./Login.css";

function Login() {
    return (
        <section className="login">
            <img className="login__logo" src="./images/logo.svg" alt="Логотип" />
            <h2 className="login__title">Рады видеть!</h2>
            <form className="login__form">
                <label className="login__label">
                    <input className="login__input" type="email" placeholder="Email" required />
                </label>
                <label className="login__label">
                    <input className="login__input" type="password" placeholder="Пароль" required />
                </label>
                <button className="login__button" type="submit">Войти</button>
            </form>
            <p className="login__text">Ещё не зарегистрированы? <a className="login__link" href="/signup">Регистрация</a></p>
        </section>
    );
}

export default Login;
