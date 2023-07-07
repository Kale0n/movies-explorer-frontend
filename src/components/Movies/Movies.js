import "./Movies.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import MoviesArray from "../../utils/MoviesArray"


function Movies () {
    return (
        <section className="movies">
            {<Header isMovies={true}
            />}
            {<SearchForm />}
            <hr className="movies__divider"></hr>
            {<MoviesCardList moviesArray={MoviesArray} isSafed={false}/>}
            <button className="movies__button" type="submit">Ещё</button>
            {<Footer/>}
        </section>
    )
}

export default Movies