import React, { useState, useEffect } from 'react';
import axios from '../axios';
import './Row.css';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row(props) {
    const { title, fetchUrl } = props;
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => {
                    //only renders if movie has poster path to show image
                    if(movie.poster_path)
                        return <img key={movie.id} className="row__poster" src={base_url+movie.poster_path} alt={movie.name} />
                })}
            </div>
        </div>
    )
}

export default Row;