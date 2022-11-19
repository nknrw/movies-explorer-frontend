import React from "react";
import "./Profile.css";

function Profile() {
    return (
        <section className="profile">
            <h2 className="profile__title">Привет, </h2>
            <form className="profile__form">
                <label className="profile__label">
                    <input className="profile__input" type="text" placeholder="Имя" required />
                </label>
                <label className="profile__label">
                    <input className="profile__input" type="email" placeholder="Email" required />
                </label>
                <button className="profile__button" type="submit">Редактировать</button>
                <button className="profile__button" type="button">Выйти из аккаунта</button>
            </form>
        </section>
    );
}

export default Profile;
