import logo from "../../images/logo.svg"
import "./Logo.css"

function Logo (props) {

    return (
        <div className="logo" onClick={props.onClick}>
            <img src={logo} alt="лого" className="logo__icon" />
        </div>
    )
}

export default Logo