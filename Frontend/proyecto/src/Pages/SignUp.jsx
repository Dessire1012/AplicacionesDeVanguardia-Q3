import React from 'react';
import '../Styles/SignUp.css';
import Cielo from '../Imagenes/Cielo.jpg';
import FbBttn from '../Components/FbBttn';
import GBttn from '../Components/GBttn';

function SignUp() {
    return (
        <div className="full-container">
            <div className="white-container">
                <img src={Cielo}/>
                <div className="overlay-container-sign">
                    <div className="signin-title">
                        <h1>Sign In</h1>
                    </div>
                    <div className="sub-title">
                            <h1>Enter your credentials</h1>
                    </div>
                    <div className="signcreds-container">
                        <h1>Enter your credentials</h1>
                    </div>
                    <div className="or-section">
                        <div className="line"></div>
                            <p>Or</p>
                        <div className="line"></div>
                    </div>
                    <div className="socialmedia-container">
                        <FbBttn/>
                        <GBttn/>
                    </div>
                    <div className="sign-container">
                        <p>Already have an account?</p>
                        <a href="/">Log In</a>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default SignUp;