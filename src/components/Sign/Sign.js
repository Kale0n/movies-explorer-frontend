import "./Sign.css"
import Logo from "../Logo/Logo"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import {register, authorize} from "../../utils/MainApi"

function Sign (props) {

    const navigate = useNavigate();
    const [isValid , setIsValid] = useState(false)
    const [errors, setErrors] = useState({});
    const [isErrorFromServer , setErrorFromServer] = useState(false)


    const [formValue, setFormValue] = useState({
        name: '',
        email: '',
        password: ''
      })

    const handleChange = (e) => {
        setErrorFromServer(false)
        const {name, value} = e.target;

        setFormValue({
          ...formValue,
          [name]: value
        });

        const newErrors = { [name]: e.target.validationMessage }
        let newIsValid = true;
        if (name === 'name') {
            if (!e.target.validationMessage && !/^[A-Za-zА-Яа-яЁё\s-]+$/.test(value)) {
                newErrors.name = 'Некорректно введено имя'
                newIsValid = false
            }
        } else if (name === 'email') {
            if (!e.target.validationMessage && !/^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(value)) {
                newErrors.email = 'Некорректно введён email'
                newIsValid = false
            }
        }

        setErrors({...errors, ...newErrors});

        setIsValid(e.target.closest("form").checkValidity() && newIsValid);
    }


    function handleLoginAPI (email, password) {
        return authorize(email, password).then((data) => {
          if (data.token) {
            props.loginUser(data.token)
          }})
        .then(() =>
            navigate('/movies', {replace: true})
        )
        .catch((response) => {
            response.json().then((data) => {
                setErrors({...errors, api: data.message});
                setErrorFromServer(true)
                setIsValid(false)
            })
        })
    }


    const handleSignUp = (e) => {
        e.preventDefault();

        const { name, password, email } = formValue;
        register(name, password, email)
        .then((data) => props.saveUser(data.data.name, data.data.email))
        .then(() => handleLoginAPI(email, password))
        .catch((response) => {
            response.json().then((data) => {
                setErrors({...errors, api: data.message});
                setErrorFromServer(true)
                setIsValid(false)
            })
        })
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        
        if (!formValue.email || !formValue.password){
            return;
        }
        handleLoginAPI(formValue.email, formValue.password, setFormValue)
    }


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
            <form className="sign__form" onChange={handleChange} noValidate>
                <fieldset className="sign__fieldset" >                
                    {props.isRegister && 
                        <label className="sign__label" htmlFor="name">Имя</label>} 
                    {props.isRegister && 
                        <input 
                            name="name" 
                            type="name"
                            className="sign__input" 
                            id="name" 
                            value={formValue.name} 
                            placeholder="Имя" 
                            minLength={2}
                            maxLength={30} 
                            required>
                        </input>}
                    {props.isRegister && 
                        (!isValid && errors.name) ? <span className="sign__error">{errors.name}</span> : <span></span> } 
                    <label className="sign__label" htmlFor="email">E-mail</label>
                    <input 
                        name="email" 
                        className="sign__input" 
                        id="email" 
                        value={formValue.email} 
                        placeholder="email"  
                        required>
                    </input>
                    {(!isValid && errors.email) ? <span className="sign__error">{errors.email}</span> : <span></span>}
                    <label className="sign__label" htmlFor="password">Password</label>
                    <input 
                        name="password" 
                        type="password" 
                        className="sign__input" 
                        id="password" 
                        value={formValue.password} 
                        placeholder="password" 
                        required> 
                    </input>
                    {(!isValid && errors.password) ? <span className="sign__error">{errors.password}</span> : <span></span> }
                </fieldset>
                {isErrorFromServer ? <span className="sign__error">{errors.api}</span> : <span></span>}
                <button disabled={!isValid && true} className={`sign__button ${!isValid && "sign__button_disabled"}`}onClick={props.isRegister ? handleSignUp : handleSignIn}>{props.buttonText}</button>
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