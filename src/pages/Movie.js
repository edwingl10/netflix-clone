import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../axios';
import './Movie.css';
import Row from '../components/Row';
import { requestSimilar } from '../requests';
import Buttons from '../components/Buttons';
import { truncate } from '../truncate';


function seasonsFormat(num){
    if(!num)
        return null;
    return num > 1 ? `${num} Seasons` : `${num} Season`;
}
function runtimeFormat(minutes){
    if(!minutes)
        return null;
    if(minutes < 60)
        return minutes;
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}
function getGenre(obj){
    if(!obj)
        return null;
    return obj[Object.keys(obj)[0]]["name"];
}
function releaseFormat(date){
    try{
        return date && date.split("-")[0];
    }catch(error){
        return 'not released';
    }
}
function displayRating(rating){
    if(!rating)
        return 'Not yet Rated';
    return `Rating: ${rating}`;
}


function Movie(props){
    const { media, id } = useParams();
    const show = media === "tv" ? true: false;
    const [movie, setMovie] = useState({});
    const [imgUrl, setImgUrl] = useState("");

    useEffect(() => {
        setMovie({});
        setImgUrl("");
        window.scrollTo(0, 0);
        async function fetchMovieData(){
            const url = `${show ? "/tv" : "/movie"}/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`;
            const request = await axios.get(url);
            setImgUrl(`https://image.tmdb.org/t/p/w780/${request.data?.backdrop_path}`);
            setMovie(request.data);
            return request;
        }
        fetchMovieData();
    }, [id, show]);
 
    return(
        <div className="movie">
            <div className="movie-container">
                <div className="movie-text">
                    <h2>{movie.id && show ? movie.name: movie.title}</h2>
                    {movie.id ? <div className="info">
                        <span>{show ? releaseFormat(movie.first_air_date) : releaseFormat(movie.release_date)} | </span>
                        <span>{show ? seasonsFormat(movie.number_of_seasons) : runtimeFormat(movie.runtime)} | </span>
                        {movie.genres && <span>{<Link className="genre" to={`/genres/${show?'tv':'movie'}/${getGenre(movie.genres)}`}>{getGenre(movie.genres)}</Link> } | </span>}
                        <span>{displayRating(movie.vote_average)}</span>
                    </div>: <div />}
                    {movie.id && <Buttons movie={movie} show={show} videos={movie.videos} />}
                    <p className="overview">{movie.id && truncate(movie.overview, 400)}</p>
                </div>
                <div className="movie-img">
                    {imgUrl ? <img src={imgUrl} alt={`${show ? movie.name : movie.title}`} /> : <div/> } 
                    <div className="img-fadeLeft" />
                </div>
            </div>    
            
            {movie.id && <Row title={`More ${getGenre(movie.genres)}`} fetchUrl={requestSimilar(show, id, "similar")} show={show} />}
            {movie.id && <Row title={`Recommended`} fetchUrl={requestSimilar(show, id, "recommendations")} show={show} />}
        </div>
    )
}
export default Movie;