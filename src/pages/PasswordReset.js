import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../components/SignIn.css';
import { auth } from '../firebase';

function PasswordReset(){
    const [error, setError] = useState(false);
    const [sentEmail, setSentEmail] = useState(false);
    const [email, setEmail] = useState('');
    let history = useHistory();

    function sendResetEmail(){
        if(email){
            auth.sendPasswordResetEmail(email)
            .then(()=>{
                setSentEmail(true);
            })
            .catch(e => setError(e.message))
        }
        else
            setError("Email is required");
    }

    return(
        <div className="bg">
        <div className="container">
        <h1 className="container-title">Reset Password</h1>
            {error && <div className="error">{error}</div>}
            {sentEmail && <div className="error">Email has been sent.</div>}
            <input className="input" type="email" name="email" value={email} placeholder="Email" id="email" onChange={event => setEmail(event.target.value)} />
            
            {!sentEmail ? <button className="signin-btn" onClick={sendResetEmail}>Send Email</button>: <button className="signin-btn" onClick={()=>history.goBack()}>Go Back</button>}

      </div>
      </div>
    )
}
export default PasswordReset;