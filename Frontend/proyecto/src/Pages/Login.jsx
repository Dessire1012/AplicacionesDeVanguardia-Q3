import './Login.css'
import Cielo from '../Imagenes/Cielo.jpg';
import LogCreds from '../Components/LogCreds';
import FbBttn from '../Components/FbBttn';
import GBttn from '../Components/GBttn';

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
                    <div className="or-section">
                        <p>Or</p>
                    </div>
                    <div className="socialmedia-container">
                        <FbBttn/>
                        <GBttn/>
                    </div>
                </div>
            </div>
        </div>
      );
  }
  
  export default Login;