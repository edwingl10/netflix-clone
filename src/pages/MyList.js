import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { Redirect } from 'react-router-dom';

function MyList(){
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

    if(!authState.pending && !authState.isSignedIn){
        return <Redirect to="/signIn" />
    }
    return(
        <div>
           <h1>My List</h1>
        </div>
    )
}
export default MyList;