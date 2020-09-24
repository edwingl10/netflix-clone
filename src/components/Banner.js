import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { movieRequests } from '../requests';
import { truncate } from '../truncate';
import './Banner.css';
import Buttons from './Buttons';


function Banner(){
    const [movie, setMovie] = useState([]);
    const bannerStyle={
        backgroundSize:"cover", 
        backgroundPosition:"top", 
        backgroundImage: movie && movie.backdrop_path ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`: 'url("")'
    }

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(movieRequests.fetchNowPlaying);
            setMovie(
                request.data.results[ Math.floor(Math.random() * request.data.results.length)]
            );
        }
        fetchData();
    }, [])
    
    return(
        <header className="banner" style={bannerStyle}>
            <div className="banner__contents">
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <Buttons movie={movie} show={false} />
                <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
            </div>

            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner;
