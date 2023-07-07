import "./Login.css"
import Sign from "../Sign/Sign"

function Login () {
    return (
        <section className="login">
            <Sign greeting="Рады видеть!" buttonText="Войти" />
        </section>
    )
}

export default Login