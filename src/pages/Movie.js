import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import Youtube from 'react-youtube';
import './Movie.css';
import Row from '../components/Row';
import { movieRequests, showRequests } from '../requests';

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
const base_url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10";

function Movie(props){
    const { id } = useParams();
    const { show } = props.location.state;
    const [movie, setMovie] = useState({});
    const [trailerUrl, setTrailerUrl] = useState("");

    function fetchUrl(){
        if(movie?.name || movie?.title){
            axios.get(`${base_url}&q=${movie.name+" trailer"}&key=${process.env.REACT_APP_YT_KEY}`)
            .then(response =>{
                setTrailerUrl(response.data["items"][0]["id"]["videoId"]);
                console.log(trailerUrl);
            })
            .catch(error => setTrailerUrl(""));
        }
    }

    useEffect(() => {
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
            {/*fetchUrl()*/}
            <div className="movie-container">
                <div className="movie-text">
                    <h2>{show ? movie.original_name: movie.original_title}</h2>
                    <p className="info">{`${show ? releaseFormat(movie.first_air_date) : releaseFormat(movie.release_date)} | ${show ? seasonsFormat(movie.number_of_seasons): runtimeFormat(movie.runtime)} | ${getGenre(movie.genres)} | rating: ${movie.vote_average}`}</p>
                    <p className="overview">{movie.overview}</p>
                </div>
                <div className="movie-img">
                    <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={`${movie.original_name}`} /> 
                    <div className="img-fadeLeft" />
                </div>
            </div>
            
            {/*trailerUrl && <Youtube videoId={trailerUrl} opts={{
                height: "390",
                width: "50%",
                playerVars: {
                    autoplay: 0
                }
            }} />*/}
            <Row title="NETFLIX ORIGINALS" fetchUrl={showRequests.fetchNetflixOriginals} isLargeRow show />
            <Row title="Trending" fetchUrl={movieRequests.fetchTrendingMovies} />
            <Row title="Top Rated" fetchUrl={movieRequests.fetchTopRated} />
        </div>
    )
}

export default Movie;
//<img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={`${movie.original_name}`} /> 