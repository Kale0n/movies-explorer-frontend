import {useNavigate} from "react-router-dom"
import {useState } from "react"
import Logo from "../Logo/Logo.js"
import Navigation from "../Navigation/Navigation.js"
import "./Header.css"

function Header (props) {

    const navigate = useNavigate()

    const [isPopupOpened, setPopupOpened] = useState(false)

    function handlePopupOpened() {
        setPopupOpened(true)
    }

    function handlePopupClosed () {
        setPopupOpened(false)
    }

    function goToSignUp () {
        navigate('/signup', { replace: true });
    }

    function goToSignIn () {
        navigate('/signin', { replace: true });
    }
    
    function goToHomePage () {
        navigate('/', { replace: true });
    }

    return(
        <header className={`header ${props.isMain ? 'header_main' : ''}`}>
            {<Logo onClick={goToHomePage}/>}
            { (props.isLoggedIn === false) ? (
                <div className="header__button-container">
                    <button className="header__button header__button_signup" onClick={goToSignUp}>Регистрация</button>
                    <button className="header__button header__button_signin" onClick={goToSignIn}>Войти</button>
                </div>
            ) : (
            <>
                <button className="header__burger-menu" onClick={handlePopupOpened}></button>
                <div className={`header__popup ${isPopupOpened ? 'header__popup_opened' : ''}`}>
                <Navigation onClose={handlePopupClosed} onHomeLinkClick={goToHomePage} isMovies={props.isMovies} isSavedMovies={props.isSavedMovies} isProfile={props.isProfile}/>
                </div>
            </>
            )}
        </header>
    )
}

export default Header