import './Login.css'
import Cielo from '../Imagenes/Cielo.jpg';
import LogCreds from '../Components/LogCreds';

function Login() {
    return (
        <div className="full-container">
            <div className="white-container">
                <img src={Cielo} alt="Descripción de la imagen" />
                <div className="overlay-container">
                    <div className="login-title">
                        <h1>Log In</h1>
                    </div>
                    <div className="sub-title">
                            <h1>Welcome Back!</h1>
                    </div>
                    <div className="logcreds-container">
                            <LogCreds />
                    </div>
                </div>
            </div>
        </div>
      );
  }
  
  export default Login;