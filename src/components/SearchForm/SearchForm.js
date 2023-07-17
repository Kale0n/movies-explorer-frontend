import "./SearchForm.css" 

function SearchForm (props) {

    return (
        <form className="form" noValidate>
            <fieldset className="form__input-container">
                <label className="form__input-label" htmlFor="movie" ></label>
                <input className="form__input" type="text" name="movie" id="movie" placeholder="Фильм" required value={props.searchValue} onChange={props.onSearchChange} ></input>
                {(!props.isValid && props.errors) && <span className="form__error">{props.errors}</span>}
            </fieldset>
            <button className={`form__button ${props.valid === false && "form__button_disabled"}`} type="submite" onClick={props.onClick} disabled={!props.valid}>Найти</button>
            <hr className="form__divider"></hr>
            <fieldset className="form__checkbox-container">
                <label className="form__checkbox-label" htmlFor="shortMovie">
                    <input className="form__checkbox-invisible" type="checkbox" name="shortMovie" onChange={props.onCheckboxChange} checked={props.isCheckboxChecked} id="shortMovie"></input>
                    <span className="form__checkbox-visible"></span>
                </label>
                <p className="form__checkbox-text">Короткометражки</p>
            </fieldset>
        </form>
    )
}

export default SearchForm