import "./Footer.css"

function Footer() {
    return(
     <footer className="footer">
        <p className="footer__paragraph">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__divider"></div>
        <div className="footer__container">
            <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
            <div className="footer__links">
                <a href="https://practicum.yandex.ru/" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                <a href="https://github.com/Kale0n" className="footer__link"target="_blank" rel="noreferrer">Github</a>
            </div>
        </div>
     </footer>
    )
}

export default Footer