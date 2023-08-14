import "./SavedMovies.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import { useState, useEffect } from "react"
import {getMovies, deleteMovie } from "../../utils/MainApi"
import Preloader from "../Preloader/Preloader";

function SavedMovies () {
    // Тут мы не используем localStorage, потому что:
    // 1. В задании написано: "Если пользователь повторно переходит на страницу ФИЛЬМОВ, 
    //    то при монтировании компонента ранее сохраненные данные достаются из локального хранилища.""
    // 2. Если сохранять результат поиска, то после первого поиска у пользователя не будет возможности посмотреть все фильмы

    const [searchValue, setSearchValue] = useState('')
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
    const [moviesArray, setMoviesArray] = useState([])
    const [selectedArray, setSelectedArray] = useState([])
    const [isPreloader, setPreloader] = useState(false)
    const [isLoaded, setIsLoaded] = useState()
    const [isSearchError, setSearchError] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getSavedMovies()
    }, [1])

    const getSavedMovies = () => {
        getMovies()
        .then((data) => {
            setMoviesArray(data.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        setPreloader(false);
        setIsLoaded(true);
    }, [selectedArray]);

    const filterMovies = () => {
        const newSelectedArray = moviesArray.filter((item => {
            if (isCheckboxChecked && item.duration > 40) {
                return false
            }
            if (!item.nameRU.toLowerCase().includes(searchValue.toLowerCase())) {
                return false
            } 
            return true;
        }))
        setSelectedArray(newSelectedArray)
    }

    useEffect(() => {
        filterMovies()
    }, [moviesArray, isCheckboxChecked])

    useEffect(() => {
        setPreloader(false);
        setIsLoaded(false)
    }, [isSearchError])

    const handleMovieSearch = (event) => {
        event.preventDefault();

        if (searchValue == "") {
            setError(true)
            setIsValid(false);
        } else {
            setIsLoaded(false)
            setSearchError(false)
            setPreloader(true)

            setTimeout(filterMovies, 300)  
        }
    }

    const handleCheckboxChange = (e) => {
        setIsCheckboxChecked(e.target.checked)
    }

    const handleSearchChange = (event) => {
        setError(false)
        setSearchValue(event.target.value)
    }

    function handleDeleteMovie(movie) {
        deleteMovie(movie._id)
        .then(() => {setMoviesArray((moviesArray) => moviesArray.filter(
            (item)=> item._id !== movie._id
        ))})
        .catch(err => console.log(err))

    }

    return (
        <>
            {<Header isSavedMovies={true}/>}
            <main className="savedMovies">
                {<SearchForm onSearchChange={handleSearchChange} isCheckboxChecked={isCheckboxChecked} onCheckboxChange={handleCheckboxChange} onClick={handleMovieSearch} valid={isValid} error={error}/>}
                <hr className="savedMovies__divider"></hr>
                {isPreloader && <Preloader />}
                {isSearchError ? <h2 className="savedMovie__error-text">
                    Во время запроса произошла ошибка. 
                    Возможно, проблема с соединением или сервер недоступен. 
                    Подождите немного и попробуйте ещё раз</h2> 
                    : ""}
               {(isLoaded) && <MoviesCardList moviesArray={selectedArray} isSaved={true} onDeleteMovie={handleDeleteMovie}/>}
            </main>
            {<Footer/>}
        </>
    )
}

export default SavedMovies