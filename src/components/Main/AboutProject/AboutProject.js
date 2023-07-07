import './AboutProject.css'
import Heading from '../Heading/Heading'

function AboutProject () {
    return (
        <section className="aboutProject">
            <Heading heading={"О проекте"} />
            <div className="aboutProject__container">
                <div className="aboutProject__text-container">
                    <h3 className="aboutProject__subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="aboutProject__paragraph">Составление плана, работу над бэкендом, 
                    вёрстку, добавление функциональности и финальные доработки.</p>
                </div>

                <div className="aboutProject__text-container">
                    <h3 className="aboutProject__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="aboutProject__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, 
                    которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>

            <div className='aboutProject__timeline'>
                <div className="aboutProject__cell aboutProject__cell_dark ">1 неделя</div>
                <div className="aboutProject__cell">4 недели</div>
                <p className="aboutProject__caption">Back-end</p>
                <p className="aboutProject__caption">Front-end</p>
            </div>
        </section>
    )
}

export default AboutProject