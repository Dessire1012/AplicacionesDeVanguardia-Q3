import "./Styles/Login.css";
import Cielo from "../Imagenes/Cielo.jpg";
import LogCreds from "../Components/LogCreds";
import FbBttn from "../Components/FbBttn";
import GBttn from "../Components/GBttn";

function Login() {
  return (
    <div className="full-container">
      <div className="white-container">
        <img src={Cielo} alt="" />
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
            <div className="line"></div>
            <p>Or</p>
            <div className="line"></div>
          </div>
          <div className="socialmedia-container">
            <FbBttn />
            <GBttn />
          </div>
          <div className="sign-container">
            <p>New user?</p>
            <a href="signup">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
