import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useGenreSearch(media, genre, pageNumber){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [movies ,setMovies] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(()=>{
        if(genre){
            setLoading(true);
            setError(false);
            axios({
                method: "GET",
                url:`https://api.themoviedb.org/3/discover/${media}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
                params: {page: pageNumber, with_genres: genre}
            }).then(res => {
                setMovies(prevMovies => {
                    return [...prevMovies, ...res.data.results.filter(el => el.poster_path && el.backdrop_path).map(movie => {
                        return {
                            id: movie.id,
                            name: media === "tv"? movie.name: movie.title,
                            poster_path: movie.poster_path
                        }
                    })];
                });
                setHasMore(pageNumber < 20);
                setLoading(false);

            }).catch(e =>{
                setError(true);
            })
        }
    }, [media, genre, pageNumber]);

    return { loading, error, movies, hasMore };
}