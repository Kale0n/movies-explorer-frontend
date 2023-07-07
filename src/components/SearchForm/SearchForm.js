import "./SearchForm.css" 

function SearchForm (props) {
    return (
        <form className="form">
            <fieldset className="form__input-container">
                <label className="form__input-label" for="movie" ></label>
                <input className="form__input" type="text" name="movie" id="movie" min="2" placeholder="Фильм"></input>
            </fieldset>
            <button className="form__button" type="submite">Найти</button>
            <hr className="form__divider"></hr>
            <fieldset className="form__checkbox-container">
                <label className="form__checkbox-label" for="shortMovie">
                    <input className="form__checkbox-invisible" type="checkbox" name="shortMovie" id="shortMovie"></input>
                    <span className="form__checkbox-visible"></span>
                </label>
                <p className="form__checkbox-text">Короткометражки</p>
            </fieldset>
        </form>
    )
}

export default SearchForm