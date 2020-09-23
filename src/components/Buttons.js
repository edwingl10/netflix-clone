import React, { useEffect, useState } from 'react';
import './Buttons.css';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/scss/modal-video.scss';
import axios from 'axios';

const base_url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10";

function Buttons(props){
    const [open, setOpen] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState('');
    const openModal = () => {setOpen(true)}
    const closeModal = () => {setOpen(false)}
    const { movie } = props;

    useEffect(() =>{
        if(movie?.name || movie?.title){
            //axios.get(`${base_url}&q=${movie.name+" trailer"}&key=${process.env.REACT_APP_YT_KEY}`)
            axios.get('https://www.youtube.com/watch?v=pS-gbqbVd8c')
            .then(response => {
                setTrailerUrl(response.data["items"][0]["id"]["videoId"]);
            })
            .catch(error => setTrailerUrl("phG4_0MpT4M"));
        }
    }, [movie]);

    return(
        <div className="banner__buttons">
            <button className="banner__button" onClick={openModal}>Play</button>
            <button className="banner__button" onClick={openModal}>+ My List</button>
            <ModalVideo channel="youtube" isOpen={open} videoId={trailerUrl} onClose={closeModal} />
        </div>
    )
}

export default Buttons;