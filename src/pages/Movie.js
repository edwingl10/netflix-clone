import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import './Movie.css';
import Row from '../components/Row';
import { requestSimilar } from '../requests';
import Buttons from '../components/Buttons';
import { truncate } from '../truncate';


function seasonsFormat(num){
    if(!num)
        return '';
    return ' | ' + (num > 1 ? `${num} Seasons` : `${num} Season`);
}
function runtimeFormat(minutes){
    if(!minutes)
        return '';
    if(minutes < 60)
        return ' | '+minutes;
    return ` | ${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}
function getGenre(obj){
    if(!obj)
        return '';
    return ' | ' + obj[Object.keys(obj)[0]]["name"];
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
        return '';
    return ` | Rating: ${rating}`;
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

    function displayMovieInfo(){
        let info = '';
        info += (show ? releaseFormat(movie.first_air_date) : releaseFormat(movie.release_date))
        info += (show ? seasonsFormat(movie.number_of_seasons): runtimeFormat(movie.runtime));
        info += getGenre(movie.genres);
        info += displayRating(movie.vote_average);
        return info;
    }
 
    return(
        <div className="movie">
            <div className="movie-container">
                <div className="movie-text">
                    <h2>{movie.id && show ? movie.name: movie.title}</h2>
                    <p className="info">{movie.id && displayMovieInfo()}</p>
                    {movie.id && <Buttons movie={movie} show={show} videos={movie.videos} />}
                    <p className="overview">{movie.id && truncate(movie.overview, 400)}</p>
                </div>
                <div className="movie-img">
                    {imgUrl ? <img src={imgUrl} alt={`${show ? movie.name : movie.title}`} /> : <div/> } 
                    <div className="img-fadeLeft" />
                </div>
            </div>    
            
            <Row title={`More ${getGenre(movie.genres)}`} fetchUrl={requestSimilar(show, id, "similar")} show={show} />
            <Row title={`Recommended`} fetchUrl={requestSimilar(show, id, "recommendations")} show={show} />
        </div>
    )
}

export default Movie;