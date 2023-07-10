import "./Register.css"
import Sign from "../Sign/Sign"

function Register () {
    return (
        <main className="register">
            <Sign greeting="Добро пожаловать!" buttonText="Зарегестрироваться" isRegister={true} />
        </main>
    )
}

export default Register