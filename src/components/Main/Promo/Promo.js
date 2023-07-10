import "./Promo.css"
import promoImage from "../../../images/promo__image.svg"

function Promo () {
    return (
        <section className="promo">
            <div className="promo__container"> 
                <div className="promo__text-container">
                    <h1 className="promo__heading">Учебный проект студента факультета Веб-разработки.</h1>
                    <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                </div>
                <img className="promo__image" alt="глобус из текста" src={promoImage}/>
            </div>
            <a href="#aboutMe" className="promo__button">Узнать больше</a>
        </section>
    )
}

export default Promo