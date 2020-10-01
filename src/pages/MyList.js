import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { Redirect } from 'react-router-dom';
import './MyList.css';

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

    useEffect(()=>{
        async function getFavorites(id){
            const test = await firestore.collection("users").doc(id).get();
            const fav = test.data().favorites;
            Object.keys(fav).map((keyName) => {
                console.log(fav[keyName]['img']);
                return 1;
            })
        }
        if(authState.user){
            getFavorites(authState.user.uid);
        }
    }, [authState.user]);

    if(!authState.pending && !authState.isSignedIn){
        return <Redirect to="/signIn" />
    }
    return(
        <div>
           <h1 className="mylist-title">My List</h1>
        </div>
    )
}
export default MyList;