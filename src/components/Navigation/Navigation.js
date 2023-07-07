import "./Navigation.css"
import AccountImage from "../../images/account_avatar.svg"
import { useNavigate } from "react-router-dom";


function Navigation(props) {

    const navigate = useNavigate();

    function goToMovies () {
        navigate('/movies', { replace: true });
    }

    function goToSavedMovies () {
        navigate('/saved-movies', { replace: true });
    }

    function goToProfile () {
        navigate('/profile', { replace: true });
    }

    return (                 
            <nav className="navigation">
                <button className="navigation__close-button" onClick={props.onClose}></button>
                <div className="navigation__links-container">
                    <ul className="navigation__text-container">
                        <li className={`navigation__link navigation__link_home`} onClick={props.onHomeLinkClick}>Главная</li>
                        <li className={`navigation__link ${props.isMovies && 'navigation__link_active'}`} onClick={goToMovies}>Фильмы</li>
                        <li className={`navigation__link ${props.isSavedMovies && 'navigation__link_active'}`} onClick={goToSavedMovies}>Сохраненные фильмы</li>
                    </ul>
                    <button className={`navigation__account-button ${props.isProfile && 'navigation__account-button_active'}`} onClick={goToProfile}>
                        <p className="navigation__account-text">Аккаунт</p>
                        <img className="navigation__account-image" src={AccountImage} alt="иконка аккаунта"/>
                    </button>
                </div> 
            </nav>
    )
}

export default Navigation