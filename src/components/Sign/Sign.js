import "./Sign.css"
import Logo from "../Logo/Logo"
import { useNavigate } from "react-router-dom"
import { useState } from "react";

function Sign (props) {

    const navigate = useNavigate();
    const [isErrorVisible , setIsErrorVisible] = useState(false)


    function goToSignIn () {
        navigate('/signin', { replace: true });
    }

    function goToSignUp () {
        navigate('/signup', { replace: true });
    }

    function goToHomePage () {
        navigate('/', { replace: true });
    }

    return (
        <div className="sign">
            {<Logo onClick={goToHomePage} />}
            <h2 className="sign__heading">{props.greeting}</h2>
            <form className="sign__form" novalidate>
                <fieldset className="sign__fieldset" >                
                    {props.isRegister && <label className="sign__label" for="name">Имя</label>} 
                    {props.isRegister && <input name="name" type="name" className="sign__input" id="name" placeholder="Имя" minLength={2} maxLength={30} required></input>}
                    {props.isRegister && isErrorVisible ? <span className="sign__error">Что-то пошло не так...</span> : <span></span> } 
                    <label className="sign__label" for="email">E-mail</label>
                    <input name="email" type="email" className="sign__input" id="email" placeholder="email" required></input>
                    {isErrorVisible ? <span className="sign__error">Что-то пошло не так...</span> : <span></span>}
                    <label className="sign__label" for="password">Password</label>
                    <input name="password" type="password" className="sign__input" id="password" placeholder="password" minLength={6} maxLength={30} required></input>
                    {isErrorVisible ? <span className="sign__error">Что-то пошло не так...</span> : <span></span> }
                </fieldset>
                <button className="sign__button">{props.buttonText}</button>
            </form>
            { props.isRegister ? 
                <p className="sign__question">Уже зарегестрированы?<span className="sign__link" onClick={goToSignIn}>Войти</span></p>
                :
                <p className="sign__question">Еще не зарегестрированы?<span className="sign__link" onClick={goToSignUp}>Регистрация</span></p>
            }
        </div>
    )
}

export default Sign