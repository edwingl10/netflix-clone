import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import './Movie.css';
import Row from '../components/Row';
import { requestSimilar } from '../requests';
import Buttons from '../components/Buttons';
import { truncate } from '../truncate';


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
    const { media, id } = useParams();
    const show = media === "tv" ? true: false;
    //const { show } = props.location.state;
    const [movie, setMovie] = useState({});
    const [imgUrl, setImgUrl] = useState("");

    useEffect(() => {
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
                    <h2>{movie && show ? movie.name: movie.title}</h2>
                    <p className="info">{`${show ? releaseFormat(movie.first_air_date) : releaseFormat(movie.release_date)} | ${show ? seasonsFormat(movie.number_of_seasons): runtimeFormat(movie.runtime)} | ${getGenre(movie.genres)} | Rating: ${movie.vote_average}`}</p>
                    <Buttons movie={movie} show={show} videos={movie.videos} />
                    <p className="overview">{truncate(movie.overview, 400)}</p>
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