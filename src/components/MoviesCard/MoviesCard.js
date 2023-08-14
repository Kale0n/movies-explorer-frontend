import "./MoviesCard.css"

const url = "https://api.nomoreparties.co/" // вынести эту прелестьв в константу

function MoviesCard( {onDeleteMovie, isSaved, movie, isLiked, onLikeClick}) {

    function handleLikeClick() {
        onLikeClick(movie, isLiked)
    }

    function handleDeleteClick(){
        onDeleteMovie(movie)
    }

    function setMovieDuration (duration) {
        const hour = Math.floor(duration / 60);
        const minutes = duration % 60; 

        if (hour === 0) {
            return `${minutes} мин`
        } else if (minutes === 0) {
            return `${hour}ч`
        } else {
            return `${hour}ч ${minutes}м`
        }
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
            <div className="movie__duration">{setMovieDuration(movie.duration)}</div>
        </div>
        // {`movie__like ${isLiked && "movie__like_active"}`}
    )
}

export default MoviesCard