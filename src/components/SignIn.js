import React, { useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import './SignIn.css';
import { auth, googleAuth, firestore } from '../firebase';
import googleIcon from '../images/google.svg';


function LoginDialog(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const [error, setError] = useState('');
    const [signUp, setSignUp] = useState(false);
    let history = useHistory();

    const [authState, setAuthState] = useState({
        isSignedIn: false,
        pending: true,
        user: null,
    });

    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(user =>
            setAuthState({ user, pending: false, isSignedIn: !!user })
        )
        return () => unregisterAuthObserver();
    }, [])

    
    function login(){
        auth.signInWithEmailAndPassword(email, password)
        .then(() => history.goBack())
        .catch(e => setError(e.message));
    }
    function signUser(){
        if(!name){
            setError("Name is required");
        }
        else{
            auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firestore.collection("users").doc(result.user.uid).set({
                    name: name,
                    email: email, 
                    favorites: {}
                });
                history.goBack();
            })
            .catch( e => setError(e.message));
        }
    }
    function toggleDialog(){
        setSignUp(prevSignUp => !prevSignUp);
    }
    function googleSignIn(){
        auth.signInWithPopup(googleAuth)
        .then((result)=> {
            let errorMessage = "";
            let document = firestore.collection("users").doc(result.user.uid);
            document.get()
            .then(doc => {
                if(!doc.exists){
                    firestore.collection("users").doc(result.user.uid).set({
                        name: result.user.displayName,
                        email: result.user.email, 
                        favorites: {}
                    });
                }
            })
            .catch(error => {errorMessage=error})

            if(errorMessage)
                throw errorMessage;

            history.goBack();      
        })
        .catch(e => setError(e.message));
    }   



    if(authState.pending){
        return <div className="bg"/>
    }
    if(!authState.pending && authState.isSignedIn){
        return <Redirect to="/" />
    }

    return(
        <div className="bg">
        <div className="container">
        <h1 className="container-title">{!signUp ? "Sign In" : "Sign Up"}</h1>
            {error && <div className="error">{error}</div>}
            {signUp && <input className="input" type="text" name="name" value={name} placeholder="Name" id="name" onChange={event => setName(event.target.value)} />}
            <input className="input" type="email" name="email" value={email} placeholder="Email" id="email" onChange={event => setEmail(event.target.value)} />
            <input className="input" type="password" name="userPassword" value={password} placeholder="Password" id="password" onChange={event => setPassword(event.target.value)} />
            
            {!signUp ? <button className="signin-btn" onClick={login}>Sign In</button> : <button className="signin-btn" onClick={signUser}>Sign Up</button>}
            {!signUp && <div className="forgot-container">
                <Link className="forgot-password" to="/password-reset">Forgot password?</Link>
            </div>}
            <div className="google-container">
                <img className="google" src={googleIcon} alt="google icon" />
                <span className="google-text" onClick={googleSignIn}>Sign In with google</span>
            </div>

            {!signUp ? <p className="signup"> New to Nedflix? <span className="signup-link" onClick={toggleDialog}>Sign up now</span></p> : 
            <p className="signup"> Aleady have an account? <span className="signup-link" onClick={toggleDialog}>Sign In</span></p> }

      </div>
      </div>
    )
}

export default LoginDialog;
