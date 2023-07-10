import Heading from "../Heading/Heading";
import "./AboutMe.css"
import Photo from "../../../images/AboutMePhoto.jpg"

function AboutMe() {
    return (
        <section id="aboutMe" className="aboutMe">
            <Heading heading={"Студент"}/>
            <div className="aboutMe__container">
                <div className="aboutMe__text-cotainer">
                    <h3 className="aboutMe__title">Катерина</h3>
                    <h4 className="aboutMe__subtitle">Фронтенд-разработчик, 25 лет</h4>
                    <p className="aboutMe__paragragh">Я родилась в Москве, сейчас живу в Белграде. Закончила исторический факультет МГУ
                         в 2022 году. Тогда же мне захотелось радикально сменить вид занятий - так я оказалась в IT. 
                         Играю на калимбе, люблю бегать, знаю все механики Silent в Slay the Spire.
                    </p>
                    <a href="https://github.com/Kale0n" className="aboutMe__gitLink" target="_blank" rel="noreferrer">Github</a>
                </div>
                <img className="aboutMe__photo" src={Photo} alt="фотография разбаточика сайта" />
            </div>
        </section>
    )
}

export default AboutMe