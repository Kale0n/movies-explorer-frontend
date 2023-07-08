import "./Movies.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import MoviesArray from "../../utils/MoviesArray"


function Movies () {
    return (
        <>
            {<Header isMovies={true}/>}
            <main className="movies">
                {<SearchForm />}
                <hr className="movies__divider"></hr>
                {<MoviesCardList moviesArray={MoviesArray} isSafed={false}/>}
                <button className="movies__button" type="submit">Ещё</button>
            </main>
            {<Footer/>}
        </>
    )
}

export default Movies