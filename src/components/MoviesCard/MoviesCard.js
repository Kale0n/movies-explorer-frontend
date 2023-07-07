import "./MoviesCard.css"

function MoviesCard( {onCardDelete, onCardLike, isLiked, isSaved, card}) {

    function handleDeleteClick() {
        onCardDelete(card)
    }

    function handleLikeClick() {
        onCardLike(true)
    }

    return (
        <div className="movie">
            <img className="movie__image" src={card.src} alt={card.name} />
            <div className="movie__container">
                <h3 className="movie__title">{card.name}</h3>
                {isSaved ? 
                    <button className="movie__delete" onClick={(handleDeleteClick)}></button>
                    : 
                    <button className={`movie__like ${isLiked && "movie__like_active"}`} onClick={(handleLikeClick)}></button>
                }
               
            </div>
            <div className="movie__duration">{card.duration}</div>
        </div>
    )
}

export default MoviesCard