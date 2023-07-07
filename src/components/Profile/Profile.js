import "./Profile.css"
import Header from "../Header/Header"

function Profile (props) {
    return (
        <main className="profile">
            {<Header />}
            <div className="profile__container">
                <h2 className="profile__heading">Привет, {props.name}!</h2>
                <form className="profile__form">
                    <fieldset className="profile__fieldset">
                        <label className="profile__label" for="name">Имя
                            <input className="profile__input" type="name" id="name" placeholder={props.name}></input>
                        </label>
                        <div className="profile__divider"></div>
                        <label className="profile__label" for="email">E-mail
                            <input className="profile__input" type="email" id="email" placeholder={props.email}></input>
                        </label>
                    </fieldset>
                    <div className="profile__button-container">
                        {props.isActive ? <button className="profile__save-button">Сохранить</button>
                        :
                        <>
                        <button className="profile__button" type="submit">Редактировать</button>
                        <button className="profile__button profile__button_exit" type="submit">Выйти из аккаунта</button>
                        </>}
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Profile 