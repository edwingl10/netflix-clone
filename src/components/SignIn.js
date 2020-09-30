import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';
import { auth } from '../firebase';
import googleIcon from '../images/google.svg';

function LoginDialog(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(!!auth.currentUser);
    const [error, setError] = useState('');

    function login(){
        auth.signInWithEmailAndPassword(email, password)
        .then(setIsSignedIn(true))
        .catch(e => setError(e.message));
    }
    

    return(
        <div className="container">
        <h1 className="container-title">Sign In</h1>
            {error !== null && <div>{error}</div>}
            <div className="error">Error</div>
            
            <input className="input" type="email" name="email" value={email} placeholder="Email" id="email" onChange={event => setEmail(event.target.value)} />
            <input className="input" type="password" name="userPassword" value={password} placeholder="Password" id="password" onChange={event => setPassword(event.target.value)} />
            
            <button className="signin-btn" onClick={login}>Sign in</button>
            <div className="forgot-container">
                <Link className="forgot-password">Forgot password?</Link>
            </div>
            <div className="google-container">
                <img className="google" src={googleIcon} alt="google icon" />
                <span className="google-text">Sign In with google</span>
            </div>

            <p className="signup"> New to Nedflix? <Link to="/signUp" className="signup-link">Sign up now</Link></p>

      </div>
    )
}

export default LoginDialog;