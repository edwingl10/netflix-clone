import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from '../axios';
import useQuerySearch from '../useQuerySearch';
import './searchResults.css';

const base_url = "https://image.tmdb.org/t/p/w185/";
let counter = 0;

function SearchResults(){
    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const { movies, hasMore, loading, error } = useQuerySearch(query, pageNumber);
    const observer = useRef();

    const lastMovieElement = useCallback(node => {
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        })
        if(node) observer.current.observe(node)
    }, [loading, hasMore]);
    
    function handleChange(e){
        setQuery(e.target.value);
        setPageNumber(1);
    }
         
    if(!loading && movies.length === 0){
        return(
            <div>
            <input className="search__bar" onChange={handleChange}/>
            <h1 style={{color: "white", marginTop: "100px", textAlign:"center"}}>Your seach did not have any results.</h1>
            </div>
        ) 
    }
 
    return(
        <div>
            <input className="search__bar" onChange={handleChange}/>
            {movies.map((movie,index) => {
                if(movies.length === index + 1){
                    return <h1 ref={lastMovieElement} key={counter++} style={{color: "white"}}>{movie.id}</h1>
                }else{
                    return <h1 key={counter++} style={{color: "white"}}>{movie.id}</h1>
                }
            })}
            <div>{loading && 'Loading...'}</div>
        </div>
    )
}
export default SearchResults;