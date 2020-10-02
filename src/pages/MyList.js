import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { Link, useHistory } from 'react-router-dom';
import './MyList.css';

const base_url = "https://image.tmdb.org/t/p/w154/";

function MyList(){
    const [authState, setAuthState] = useState({
        isSignedIn: false,
        pending: true,
        user: null,
    });
    const [favorites, setFavorites] = useState({});
    let history = useHistory();

    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(user =>
            setAuthState({ user, pending: false, isSignedIn: !!user })
        )
        return () => unregisterAuthObserver();
    }, [])

    useEffect(()=>{
        async function getFavorites(id){
            const document = await firestore.collection("users").doc(id).get();
            setFavorites(document.data().favorites);
        }
        if(authState.user){
            getFavorites(authState.user.uid);
        }
    }, [authState.user]);

    if(!authState.pending && !authState.isSignedIn){
        history.push("/signIn");
    }

    return(
        <div>
           <h1 className="mylist-title">My List</h1>
           <div className="favorites-results">
            {Object.keys(favorites).map(keyName => {
                return (
                    <Link to={`/${favorites[keyName]['show'] ? "tv": "movie"}/${keyName}`} key={keyName}>
                    <img key={keyName} className='favorites' src={`${base_url}${favorites[keyName]['img']}`} alt={favorites[keyName]['name']} />
                    </Link>
                )
            })}
           </div>
        </div>
    )
}
export default MyList;

/*
Object.keys(fav).map((keyName) => {
                console.log(fav[keyName]['img']);
                return 1;
            })
*/