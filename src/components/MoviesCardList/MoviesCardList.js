import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"


function MoviesCardList (props) {

    return (
        <section className="moviesCardList">
            { props.moviesArray ? props.moviesArray.map((card) => <MoviesCard  card={card} isLiked={card.isLiked} isSaved={props.isSaved}/>) 
            : <h2 className="moviesCardList__empty">Здесь еще ничего нет !</h2>}
        </section>
    )
}

export default MoviesCardList