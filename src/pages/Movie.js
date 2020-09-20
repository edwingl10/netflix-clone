import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';

function Movie(props){
    const { id } = useParams();
    const { show } = props.location.state;
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchMovieData(){
            const url = `${show ? "/tv" : "/movie"}/${id}?api_key=${process.env.REACT_APP_API_KEY}`;
            const request = await axios.get(url);
            setMovie(request.data);
            return request;
        }
        fetchMovieData();
    }, [id. show]);

    return(
        <div className="movie">
            <div className="movie-container">
                <div className="movie-text">
                    <h1>{show ? movie.original_name: movie.original_title}</h1>
                    <p>{`${show ? movie.first_air_date: movie.release_date} | ${show ? movie.number_of_seasons: movie.runtime} | ${"Genres"} | ${movie.vote_average}`}</p>
                    <p>{movie.overview}</p>
                </div>
                <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={`${movie.original_name}`} />
            </div>
        </div>
    )
}

export default Movie;