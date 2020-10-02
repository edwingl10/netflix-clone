import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import firebase from 'firebase/app';
import './Buttons.css';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/scss/modal-video.scss';
import axios from 'axios';

const base_url = " https://api.themoviedb.org/3/";


function Buttons(props){
    const [open, setOpen] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState('');
    const openModal = () => {setOpen(true)}
    const closeModal = () => {setOpen(false)}
    const { movie, show, videos } = props;
    const [favorite, setFavorite] = useState(false);

    const [authState, setAuthState] = useState({
        isSignedIn: false,
        pending: true,
        user: null,
    });
    let history = useHistory();

    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(user =>
            setAuthState({ user, pending: false, isSignedIn: !!user })
        )
        return () => unregisterAuthObserver();
    }, []);

    useEffect(() =>{
        if(videos){
            getTrailer(videos.results);
        }
        else if(movie?.name || movie?.title){
            axios.get(`${base_url}${show ? "tv": "movie"}/${movie.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            .then(response => {
                getTrailer(response.data["results"]);
            })
            .catch(error => setTrailerUrl("SqSiUVUvVCE"));
        }
    }, [movie, show, videos]);

    useEffect(()=>{
        async function isFavorite(id){
            const test = await firestore.collection("users").doc(id).get();
            let fav;
            try{
                fav = test.data().favorites[movie.id];
                fav ? setFavorite(true) : setFavorite(false);
            }catch(e){
                setFavorite(false);
            }
            
        }
        if(movie && authState.user){
            isFavorite(authState.user.uid);
        }
    }, [authState.user, movie]);

    function getTrailer(trailers){
        let trailer = '';
        trailers.forEach(res =>{
            res.type === "Trailer" && (trailer = res.key)
        });
        trailer ? setTrailerUrl(trailer) : setTrailerUrl("SqSiUVUvVCE");
    }
    function addToFavorites(){
        if(!authState.pending && authState.isSignedIn){
            modList();
        }
        else{
            history.push("/signIn");
        }
    }
    function modList(){
        if(!favorite){
            firestore.collection("users").doc(authState.user.uid).update({
                [`favorites.${movie.id}`]: {"img": movie.poster_path, "name": show? movie.name : movie.title, "show": show }
            }).then(() => setFavorite(true))
        }
        else{
            firestore.collection("users").doc(authState.user.uid).update({
                [`favorites.${movie.id}`]: firebase.firestore.FieldValue.delete()
            }).then(()=>setFavorite(false))
        }
    }

    return(
        <div className="banner__buttons">
            <button className="banner__button" onClick={openModal}>Play</button>
            <button className={`banner__button ${authState.user && favorite && 'green'}`} onClick={addToFavorites}>+ My List</button>
            <ModalVideo channel="youtube" isOpen={open} videoId={trailerUrl} onClose={closeModal} />
        </div>
    )
}

export default Buttons;