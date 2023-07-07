import "./Register.css"
import Sign from "../Sign/Sign"

function Register () {
    return (
        <section className="register">
            <Sign greeting="Добро пожаловать!" buttonText="Зарегестрироваться" isRegister={true} />
        </section>
    )
}

export default Register