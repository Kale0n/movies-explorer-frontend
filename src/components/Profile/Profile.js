import "./Profile.css"
import Header from "../Header/Header"
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";

function Profile (props) {

    const navigate = useNavigate()
    const user =  useContext(CurrentUserContext);
    const [isValid , setIsValid] = useState(false)
    const [isServerError, setServerError] = useState(false)
    const [errors, setErrors] = useState({})
    const [isSaveButtonVisible, setSaveButtonVisible] = useState(false)
    const [isInputActive, setInputActive] = useState(false)

    const [formValue, setFormValue] = useState({
        name: user.name,
        email: user.email,
    })

    useEffect(() => {
        setInputActive(false)
        setSaveButtonVisible(false)
    }, [user])

    function handleEditButton(e) {
        e.preventDefault();

        setInputActive(true)
        setSaveButtonVisible(true)
        setIsValid(false)
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setServerError(false)

        setFormValue({
          ...formValue,
          [name]: value
        });

        let newIsValid = true;

        const newErrors = { [name]: e.target.validationMessage }
        if (name === 'name') {
            if ( user.name === value && user.email === formValue.email) {
                newIsValid = false
            }
            if (!e.target.validationMessage && !/^[A-Za-zА-Яа-яЁё\s-]+$/.test(value)) {
                newErrors.name = 'Некорректно введено имя'
                newIsValid = false
            }
        } else if (name === 'email') {
            if ( user.name === formValue.name && user.email === value) {
                newIsValid = false
            }
            if (!e.target.validationMessage && !/^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(value)) {
                newErrors.email = 'Некорректно введён email'
                newIsValid = false
            }
        }

        if (!e.target.closest("form").checkValidity()) {
            newIsValid = false
        }

        setErrors({...errors, ...newErrors});

        setIsValid(newIsValid);
    }

    function handleSaveButton (e) {
        e.preventDefault();

        props.updateUser(formValue)
        .catch((response) => {
            response.json().then((data) => {
                setErrors({...errors, api: data.message});
                setServerError(true)
                setIsValid(false)
            })
        })
    }


    function handleSignOut (e) {
        e.preventDefault();

        localStorage.removeItem('token');
        localStorage.removeItem('searchResultsAndParams');
        props.logOut();
        navigate("/", {replace:true})
    }
    
    return (
        <>
            {<Header />}
            <main className="profile">
                <div className="profile__container">
                    <h2 className="profile__heading">Привет, {user.name}!</h2>
                    <form className="profile__form" onChange={handleChange} noValidate >
                        <fieldset className="profile__fieldset">
                            <label className="profile__label" htmlFor="name">Имя
                                <input className="profile__input" name="name" type="name" id="name" value={formValue.name} disabled={!isInputActive}></input>
                                {(!isValid && errors.name) ? <span className="profile__error">{errors.name}</span> : <span></span> } 
                            </label>
                            <div className="profile__divider"></div>
                            <label className="profile__label" htmlFor="email">E-mail
                                <input className="profile__input" type="email" name="email" id="email" value={formValue.email} disabled={!isInputActive}></input>
                                {(!isValid && errors.email) ? <span className="profile__error">{errors.email}</span> : <span></span> } 
                            </label>
                        </fieldset>
                        <div className="profile__button-container">
                            {isServerError && <span className="profile__error profile__error_server">{errors.api}</span>}
                            {isSaveButtonVisible ? <button className={`profile__save-button ${!isValid && "profile__save-button_inactive"}`} onClick={handleSaveButton} disabled={!isValid}>Сохранить</button>
                            :
                            <>
                            <button className="profile__button" type="submit" onClick={handleEditButton}>Редактировать</button>
                            <button className="profile__button profile__button_exit" type="submit" onClick={handleSignOut}>Выйти из аккаунта</button>
                            </>}
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Profile 