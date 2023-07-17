import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"
import { getMovies, deleteMovie, saveMovie } from "../../utils/MainApi"
import { useState, useEffect } from "react"


function MoviesCardList ( {moviesArray, onDeleteMovie, isSaved} ) {

    const [savedMoviesArray, setSavedMoviesArray] = useState([])

    useEffect(() => {
        getSavedMovies()
    }, [1])

    function getSavedMovies() {
        getMovies()
        .then((data) => 
        {setSavedMoviesArray(data.data)
        })
        .catch(err => console.log(err))
    }

    function getIslikedFromMovie(movie) {
        for (let i = 0; i < savedMoviesArray.length; i = i + 1 ) {
            if (savedMoviesArray[i].nameRU === movie.nameRU) {
                return true;
            } 
        }
        return false
    }
    
    function handleLikeClick(movie, isLiked) {
        if (!isLiked) {
            saveMovie(movie)
            .then((newMovie) => {
                setSavedMoviesArray((moviesArray) => {
                    return [...moviesArray, newMovie]
                })
            })
            .catch(err => console.log(err))
        } else {
            // movie.id is id of the movie from beatfilm API
            // movieFromArray.movieId is id from our API (saved movies)
            // final ._id is id of the movie in the mongo database
            const databaseId = savedMoviesArray.find((movieFromArray) => movieFromArray.movieId === movie.id)._id
            deleteMovie(databaseId).then(() => {
                setSavedMoviesArray((moviesArray) => {
                    return moviesArray.filter((movieFromArray) => movieFromArray.movieId !== movie.id)
                })
            })
            .catch((err) => {console.log(err)});
        }

      }


    return (
        <section className="moviesCardList">
            { moviesArray.length === 0 ? 
            <h2 className="moviesCardList__empty">Ничего не найдено!</h2>  
            : 
            moviesArray.map((movie) => <MoviesCard key={movie.nameRU} movie={movie} isLiked={getIslikedFromMovie(movie)} onLikeClick={handleLikeClick} isSaved={isSaved} onDeleteMovie={onDeleteMovie}/> 
            )}
        </section>
    )
}

export default MoviesCardList