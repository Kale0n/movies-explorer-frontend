import "./Movies.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import { useState, useEffect, useCallback } from "react"
import Preloader from "../Preloader/Preloader"
import getMovies from '../../utils/MoviesApi';

function Movies () {
    let searchResultsAndParams = localStorage.getItem('searchResultsAndParams')
    if (!searchResultsAndParams) {
        searchResultsAndParams = '{}'
    }
    searchResultsAndParams = JSON.parse(searchResultsAndParams)

    const [searchValue, setSearchValue] = useState((searchResultsAndParams.hasOwnProperty('searchValue')) ? searchResultsAndParams.searchValue : '')
    const [isCheckboxChecked, setIsCheckboxChecked] = useState((searchResultsAndParams.hasOwnProperty('isCheckboxChecked')) ? searchResultsAndParams.isCheckboxChecked : false)
    const [moviesArray, setMoviesArray] = useState((searchResultsAndParams.hasOwnProperty('moviesArray')) ? searchResultsAndParams.moviesArray : [])
    const [selectedArray, setSelectedArray] = useState((searchResultsAndParams.hasOwnProperty('selectedArray')) ? searchResultsAndParams.selectedArray : [])
    const [visibleArray, setVisibleArray] = useState([])
    const [isPreloader, setPreloader] = useState(false)
    const [isLoaded, setIsLoaded] = useState()
    const [isOpen, setIsOpen] = useState((searchResultsAndParams.hasOwnProperty('isOpen')) ? searchResultsAndParams.isOpen : false)
    const [isSearchError, setSearchError] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState(false);
    const [isAllMoviesLoaded, setAllMoviesLoaded] = useState(true)
    const [moreMoviesCounter, setMoreMoviesCounter] = useState(0) 
    const [initialCardsNumber, setInitialCardsNumber] = useState(12)
    const [moreMoviesCardsNumber, setMoreMoviesCardsNumber] = useState(4) 

    const widthsToCardsParams = [
        {
            width: 1280,  // 1280 и все больше: 12 карточек
            initialCardsNumber: 12,
            moreMoviesCardsNumber: 4,
        },
        {
            width: 1279,  // 1130-1279: 12 карточек
            initialCardsNumber: 12,
            moreMoviesCardsNumber: 3,
        },
        {
            width: 1130,  // 765-1130: 8 карточек
            initialCardsNumber: 8,
            moreMoviesCardsNumber: 2,
        },
        {
            width: 765,  // 320-765 (и все меньше): 5 карточек
            initialCardsNumber: 5,
            moreMoviesCardsNumber: 2,
        },
    ]

    const calculateCardsParams = (width) => {
        let newInitialCardsNumber = widthsToCardsParams[0].initialCardsNumber;
        let newMoreMoviesCardsNumber = widthsToCardsParams[0].moreMoviesCardsNumber;
        for (let cardsParams of widthsToCardsParams) {
            if (width > cardsParams.width) {
                break;
            }
            newInitialCardsNumber = cardsParams.initialCardsNumber;
            newMoreMoviesCardsNumber = cardsParams.moreMoviesCardsNumber;
        }
        setInitialCardsNumber(newInitialCardsNumber);
        setMoreMoviesCardsNumber(newMoreMoviesCardsNumber);
    }

    const debounce = (fn, delay) => {
        let timerId;
        return (...args) => {
            clearTimeout(timerId);
            timerId = setTimeout(() => fn(...args), delay);
        }
    };

    useEffect(() => {
        calculateCardsParams(window.screen.width);
        const debouncedCalculateCardsParams = debounce(calculateCardsParams, 300);
        window.addEventListener("resize", (event) => {debouncedCalculateCardsParams(window.screen.width)});
    }, [])

    useEffect(() => {
        setPreloader(false);
        setIsLoaded(true);
    }, [selectedArray, isSearchError]);

    useEffect(() => {
        const newSelectedArray = moviesArray.filter((item => {
            if (isCheckboxChecked && item.duration > 40) {
                return false
            }
            return true;
        }))

        localStorage.setItem('searchResultsAndParams', JSON.stringify({
            searchValue: searchValue,
            isCheckboxChecked: isCheckboxChecked,
            moviesArray: moviesArray,
            selectedArray: newSelectedArray,
            isOpen: isOpen
        }));

        setSelectedArray(newSelectedArray)
    }, [moviesArray, isCheckboxChecked])

    const renderMovies = useCallback(() => {
        const visibleCardsNumber = ((initialCardsNumber) + (moreMoviesCounter * moreMoviesCardsNumber));
        setVisibleArray(selectedArray.slice(0, visibleCardsNumber))
        if (visibleCardsNumber >= selectedArray.length) {
            setAllMoviesLoaded(true)
        } else { setAllMoviesLoaded(false)}
    }, [selectedArray, initialCardsNumber, moreMoviesCounter, moreMoviesCardsNumber])

    function handleMoreMoviesButton () {
        setMoreMoviesCounter((moreMoviesCounter) => moreMoviesCounter + 1)
    }

    useEffect(() => {
        renderMovies()
    }, [selectedArray, initialCardsNumber, moreMoviesCardsNumber, moreMoviesCounter])

    function fetchMovies () {
        setIsOpen(true)

        getMovies()
        .then((movies) => {    
            const newMoviesArray = movies.filter(function (item) {
                if (!item.nameRU.toLowerCase().includes(searchValue.toLowerCase())) {
                    return false
                } 
                return true
            })

            setMoviesArray(newMoviesArray)
        })
        .catch((err) => {
            console.log(err.message)
            setSearchError(true)})
        }  


    function handleMovieSearch(event) {
        event.preventDefault();

        if (searchValue == "") {
            setError(true)
            setIsValid(false);
        } else {
            setIsValid(true)
            setIsLoaded(false)
            setSearchError(false)
            setPreloader(true)

            setTimeout(fetchMovies, 300)
        }
    }

    const handleCheckboxChange = (e) => {
        setIsCheckboxChecked(e.target.checked)
    }

    const handleSearchChange = (event) => {
            setError(false);
            setSearchValue(event.target.value)
    }


    return (
        <>
            {<Header isMovies={true}/>}
            <main className="movies">
                {<SearchForm  searchValue={searchValue} onSearchChange={handleSearchChange} isCheckboxChecked={isCheckboxChecked} onCheckboxChange={handleCheckboxChange} onClick={handleMovieSearch} valid={isValid} error={error}/>}
                <hr className="movies__divider"></hr>
                {isPreloader && <Preloader />}
                {isSearchError ? <h2 className="movie__error-text">
                    Во время запроса произошла ошибка. 
                    Возможно, проблема с соединением или сервер недоступен. 
                    Подождите немного и попробуйте ещё раз</h2> 
                    : ""}
                {isOpen ? (isLoaded) && <MoviesCardList moviesArray={visibleArray} isSafed={false}/> : <h2 className="movie__error-text">Здесь еще ничего нет!</h2>}
                {!isAllMoviesLoaded && <button className="movies__button" type="submit" onClick={handleMoreMoviesButton}>Ещё</button>}
            </main>
            {<Footer/>}
        </>
    )
}

export default Movies