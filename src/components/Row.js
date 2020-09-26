import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';
import './Row.css';
import ImgPlaceholder from './ImgPlaceholder';
import LazyLoad from 'react-lazyload';

const base_url = "https://image.tmdb.org/t/p/w185/";

function Row(props) {
    const { title, fetchUrl, isLargeRow, show } = props;
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            request.status === 200 && setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className="row">
            <h2>{movies.length !== 0 && title}</h2>
 
            <div className="row__posters">
                {movies.map(movie => {
                    if(movie.poster_path && movie.backdrop_path){
                        return (
                            <LazyLoad key={movie.id} placeholder={<ImgPlaceholder />} once={true} height={170} offset={30}>
                            <Link to={`/${show? "tv": "movie"}/${movie.id}`}
                            key={movie.id}>
                                <img key={movie.id} className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${base_url}${movie.poster_path}`} alt={movie.name} />
                            </Link>
                            </LazyLoad>
                        );
                    }
                    else{
                        return <div key={movie.id}/>
                    }
                })}
            </div>
          
        </div>
    )
}

export default Row;
