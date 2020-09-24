import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';
import './Row.css';
import ImgPlaceholder from './ImgPlaceholder';
import LazyLoad from 'react-lazyload';

const base_url = "https://image.tmdb.org/t/p/original/";

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
            <LazyLoad placeholder={<ImgPlaceholder />} once={true} height={253} offset={50}>
            <div className="row__posters">
                {movies.map(movie => {
                    if(movie.poster_path && movie.backdrop_path){
                        return (
                            
                            <Link to={{
                                pathname: `/${movie.id}`,
                                state: {show} 
                            }} 
                            key={movie.id}>
                                <img key={movie.id} className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${base_url}${movie.poster_path}`} alt={movie.name} />
                            </Link>
                            
                        );
                    }
                    else{
                        return <div key={movie.id}/>
                    }
                })}
            </div>
            </LazyLoad>
        </div>
    )
}

export default Row;
