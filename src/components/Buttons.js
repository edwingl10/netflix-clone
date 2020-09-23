import React, { useEffect, useState } from 'react';
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
    const { movie, show } = props;

    useEffect(() =>{
        if(movie?.name || movie?.title){
            axios.get(`${base_url}${show ? "tv": "movie"}/${movie.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            .then(response => {
                const results = response.data["results"];
                let trailer = '';

                results.forEach(res =>{
                    res.type === "Trailer" && (trailer = res.key)
                });
                trailer ? setTrailerUrl(trailer) : setTrailerUrl("phG4_0MpT4M");
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