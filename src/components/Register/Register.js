import "./Register.css"
import Sign from "../Sign/Sign"

function Register (props) {

    return (
        <main className="register">
            <Sign greeting="Добро пожаловать!" buttonText="Зарегестрироваться" isRegister={true} saveUser={props.onRegisterUser} loginUser={props.onLoginUser} user={props.user}/>
        </main>
    )
}

export default Register