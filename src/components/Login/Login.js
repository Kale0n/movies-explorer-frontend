import "./Login.css"
import Sign from "../Sign/Sign"

function Login () {
    return (
        <main className="login">
            <Sign greeting="Рады видеть!" buttonText="Войти" />
        </main>
    )
}

export default Login