import React, { useState, useRef, useCallback } from 'react'
import { movieids, showids } from '../genreIds';
import { useParams, Link } from 'react-router-dom';
import useGenreSearch from '../useGenreSearch';
import './Genres.css';

const base_url = "https://image.tmdb.org/t/p/w154/";

function Genres(){
    const {media, genre} = useParams();
    const [pageNumber, setPageNumber] = useState(1);
    let genreNum = media === 'tv'? showids[genre]:movieids[genre];

    const { movies, hasMore, loading, error }  = useGenreSearch(media, genreNum, pageNumber);
    const observer = useRef();

    const lastMovieElement = useCallback(node =>{
        if(loading) return;
        if(observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        })
        if(node) observer.current.observe(node);
    }, [loading, hasMore]);

    if(error){
        return <h1 className="genre-title">Something went wrong.</h1>
    }
    
    return(
        <div>
            <h1 className="genre-title">{`${genre} ${media === 'tv' ? 'shows': 'movies'}`}</h1>
            <div className="genre-results">
            {movies.map((movie,index) => {
                if(movies.length === index + 1){
                    return (
                        <Link to={`/${media === "tv" ? "tv": "movie"}/${movie.id}`} key={movie.id}>
                            <img ref={lastMovieElement} className="poster" key={movie.id} src={`${base_url}${movie.poster_path}`} alt={movie.name} />
                        </Link>
                    )
                }else{
                    return (
                        <Link to={`/${media === "tv" ? "tv": "movie"}/${movie.id}`} key={movie.id}>
                            <img className="poster" key={movie.id} src={`${base_url}${movie.poster_path}`} alt={movie.name} />
                        </Link>
                    )
                }
             
            })}
            </div>
        </div>
    )
}
export default Genres;