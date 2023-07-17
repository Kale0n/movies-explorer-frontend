import "./MoviesCard.css"
import { saveMovie, deleteMovie, changeMovieLikeStatus } from "../../utils/MainApi"
import { useState } from "react"

const url = "https://api.nomoreparties.co/" // вынести эту прелестьв в константу

function MoviesCard( {onDeleteMovie, isSaved, movie, isLiked, onLikeClick}) {


    function handleLikeClick() {
        onLikeClick(movie, isLiked)
    }

    function handleDeleteClick(){
        onDeleteMovie(movie)
        .catch(err => console.log(err))

    }

    return (
        <div className="movie">
            <a href={movie.trailerLink} target="_blank" rel="noreferrer" ><img className="movie__image" src={isSaved? movie.image : `${url}${movie.image.url}`} alt={movie.nameRU}/>
            </a>
            <div className="movie__container">
                <h3 className="movie__title">{movie.nameRU}</h3>
                {isSaved ? 
                    <button className="movie__delete" onClick={handleDeleteClick}></button>
                    : 
                    <button className={`movie__like ${isLiked && "movie__like_active"}`} onClick={(e) => handleLikeClick(movie)}></button>
                }
               
            </div>
            <div className="movie__duration">{movie.duration} мин</div>
        </div>
        // {`movie__like ${isLiked && "movie__like_active"}`}
    )
}

export default MoviesCard