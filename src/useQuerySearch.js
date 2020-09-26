import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useQuerySearch(query, pageNumber){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [movies ,setMovies] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() =>{
        setMovies([]);
    }, [query]);

    useEffect(()=>{
        if(query){
        setLoading(true);
        setError(false);
        let cancel;
        axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
            params: {query: query, page: pageNumber},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setMovies(prevMovies => {
                return [...prevMovies, ...res.data.results.filter(el => el.poster_path && el.backdrop_path).map(movie => {
                    return {
                        id: movie.id,
                        name: movie.media_type === "tv"? movie.name: movie.title,
                        poster_path: movie.poster_path,
                        media_type: movie.media_type,
                    }
                })];
            });
            setHasMore(pageNumber < 20);
            setLoading(false);
    
        }).catch(e => {
            if(axios.isCancel(e)) return;
            setError(true);
        })
        return () => cancel();}
    }, [query, pageNumber]);

    return { loading, error, movies, hasMore };
}
