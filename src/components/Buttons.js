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
    const { movie, show, videos } = props;

    function getTrailer(trailers){
        let trailer = '';
        trailers.forEach(res =>{
            res.type === "Trailer" && (trailer = res.key)
        });
        trailer ? setTrailerUrl(trailer) : setTrailerUrl("SqSiUVUvVCE");
    }

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

    return(
        <div className="banner__buttons">
            <button className="banner__button" onClick={openModal}>Play</button>
            <button className="banner__button" onClick={openModal}>+ My List</button>
            <ModalVideo channel="youtube" isOpen={open} videoId={trailerUrl} onClose={closeModal} />
        </div>
    )
}

export default Buttons;