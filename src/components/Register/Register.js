import React from "react";
import "./Register.css";

function Register() {
    return (
        <section className="register">
            <img className="register__logo" src="./images/logo.svg" alt="Логотип" />
            <h2 className="register__title">Добро пожаловать!</h2>
            <form className="register__form">
                <label className="register__label">
                    <input className="register__input" type="text" placeholder="Имя" required />
                </label>
                <label className="register__label">
                    <input className="register__input" type="email" placeholder="Email" required />
                </label>
                <label className="register__label">
                    <input className="register__input" type="password" placeholder="Пароль" required />
                </label>
                <button className="register__button" type="submit">Зарегистрироваться</button>
            </form>
            <p className="register__text">Уже зарегистрированы? <a className="register__link" href="/signin">Войти</a></p>
        </section>
    );
}

export default Register;
