import "./Login.css"
import Sign from "../Sign/Sign"

function Login (props) {

    return (
        <main className="login">
            <Sign greeting="Рады видеть!" buttonText="Войти" loginUser={props.onLoginUser} isLoggedIn={props.isLoggedIn} />
        </main>
    )
}

export default Login