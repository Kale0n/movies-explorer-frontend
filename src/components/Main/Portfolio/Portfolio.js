import "./Portfolio.css";
import Arrow from "../../../images/arrow.svg"

const Static = "https://github.com/Kale0n/how-to-learn";
const Adaptiv ="https://kale0n.github.io/russian-travel/"
const OnePage = "https://kale0n.github.io/mesto/"

function Portfolio () {
    return (
    <section className="portfolio">
        <h2 className="portfolio__heading">Портфолио</h2>
        <ul className="portfolio__links">
            <li className="portfolio__link">
                <a className="portfolio__link-name" href={Static} target="_blank" rel="noreferrer">Статичный сайт</a>
                <a href={Static} target="_blank" rel="noreferrer">
                    <img className="portfolio__link-icon" src={Arrow} alt="стрелочка"/>
                </a>
            </li>
            <hr className="portfolio__divider"/>
            <li className="portfolio__link">
                <a className="portfolio__link-name" href={Adaptiv} target="_blank" rel="noreferrer">Адаптивный сайт</a>
                <a href={Adaptiv} target="_blank" rel="noreferrer">
                    <img className="portfolio__link-icon" src={Arrow} alt="стрелочка"/>
                </a> 
            </li>
            <hr className="portfolio__divider"/>
            <li className="portfolio__link">
                <a className="portfolio__link-name" href={OnePage} target="_blank" rel="noreferrer">Одностраничное приложение</a>
                <a href={OnePage} target="_blank" rel="noreferrer">
                    <img className="portfolio__link-icon" src={Arrow} alt="стрелочка"/>
                </a>    
            </li>
        </ul>
    </section>
    )
}

export default Portfolio