import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useQuerySearch from '../useQuerySearch';
import './searchResults.css';

const base_url = "https://image.tmdb.org/t/p/w154/";
let counter = 0;

function SearchResults(){
    const [query, setQuery] = useState(sessionStorage.getItem('search') || '');
    const [pageNumber, setPageNumber] = useState(1);
    const { movies, hasMore, loading, error } = useQuerySearch(query, pageNumber);
    const observer = useRef();

    const lastMovieElement = useCallback(node => {
        if(loading) return
        if(observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        })
        if(node) observer.current.observe(node)
    }, [loading, hasMore]);
    
    function handleChange(e){
        sessionStorage.setItem('search', e.target.value);
        setQuery(e.target.value);
        setPageNumber(1);
    }

    if(error){
        return(
            <div>
            <input className="search__bar" onChange={handleChange} placeholder="search" value={query} />
            <h1 className="no-results">There was an error. Please try again later.</h1>
            </div>
        )
    }

    if(!loading && movies.length === 0){
        return(
            <div>
            <input className="search__bar" onChange={handleChange} placeholder="search" value={query} />
            <h1 className="no-results">Your seach did not have any results.</h1>
            </div>
        ) 
    }

    return(
        <div>
            <input className="search__bar" onChange={handleChange} placeholder="search" value={query} autoFocus/>
            <div className="results">
            {movies.map((movie,index) => {
                if(movies.length === index + 1){
                    return (
                        <Link to={`/${movie.media_type === "tv" ? "tv": "movie"}/${movie.id}`} key={counter++}>
                            <img ref={lastMovieElement} className="poster" key={counter++} src={`${base_url}${movie.poster_path}`} alt={movie.name} />
                        </Link>
                    )
                }else{
                    return (
                        <Link to={`/${movie.media_type === "tv" ? "tv": "movie"}/${movie.id}`} key={counter++}>
                            <img className="poster" key={counter++} src={`${base_url}${movie.poster_path}`} alt={movie.name} />
                        </Link>
                    )
                }
             
            })}
            </div>
            
        </div>
    )
}
export default SearchResults;