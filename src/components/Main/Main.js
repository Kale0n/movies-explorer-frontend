import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Promo from "./Promo/Promo"
import AboutProject from "./AboutProject/AboutProject"
import Techs from "./Techs/Techs"
import AboutMe from "./AboutMe/AboutMe"
import Portfolio from "./Portfolio/Portfolio"
import "./Main.css"

function Main (props) { 
    return (
        <main className="main">
            {<Header 
                isMain={true} 
            /> }
            {<Promo/>}
            {<AboutProject />}
            {<Techs />}
            {<AboutMe />}
            {<Portfolio />}
            {<Footer />}
        </main>
    )
}

export default Main;