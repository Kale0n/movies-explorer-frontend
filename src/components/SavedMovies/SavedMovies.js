import "./SavedMovies.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SavedMoviesArray from "../../utils/SavedMoviesArray"


function SavedMovies () {
    return (
        <section className="savedMovies">
            {<Header isSavedMovies={true}/>}
            {<SearchForm />}
            <hr className="savedMovies__divider"></hr>
            {<MoviesCardList moviesArray={SavedMoviesArray} isSaved={true}/>}
            {/* <button className="movies__button" type="submit">Ещё</button> */}
            {<Footer/>}
        </section>
    )
}

export default SavedMovies