import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import './Movie.css';
import Row from '../components/Row';
import { requestSimilar } from '../requests';
import Buttons from '../components/Buttons';

function seasonsFormat(num){
    return num > 1 ? `${num} Seasons` : `${num} Season`;
}
function runtimeFormat(minutes){
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}
function getGenre(obj){
    return obj && obj[Object.keys(obj)[0]]["name"];
}
function releaseFormat(date){
    return date && date.split("-")[0];
}

function Movie(props){
    const { id } = useParams();
    const { show } = props.location.state;
    const [movie, setMovie] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchMovieData(){
            const url = `${show ? "/tv" : "/movie"}/${id}?api_key=${process.env.REACT_APP_API_KEY}`;
            const request = await axios.get(url)
            setMovie(request.data);
            return request;
        }
        fetchMovieData();
    }, [id, show]);

    return(
        <div className="movie">
            <div className="movie-container">
                <div className="movie-text">
                    <h2>{show ? movie.original_name: movie.original_title}</h2>
                    <p className="info">{`${show ? releaseFormat(movie.first_air_date) : releaseFormat(movie.release_date)} | ${show ? seasonsFormat(movie.number_of_seasons): runtimeFormat(movie.runtime)} | ${getGenre(movie.genres)} | rating: ${movie.vote_average}`}</p>
                    <Buttons movie={movie} />
                    <p className="overview">{movie.overview}</p>
                </div>
                <div className="movie-img">
                    <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={`${movie.original_name}`} /> 
                    <div className="img-fadeLeft" />
                </div>
            </div>
            
            <Row title={`More ${getGenre(movie.genres)}`} fetchUrl={requestSimilar(show, id, 1)} show={show} />
            <Row title="You Might Also Like" fetchUrl={requestSimilar(show, id, 2)} show={show} />
        </div>
    )
}

export default Movie;