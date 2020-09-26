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
                return [...prevMovies, ...res.data.results.map(el => {
                    return{
                        id: el.id,
                        media_type: el.media_type,
                        poster_path: el.poster_path,
                        backdrop_path: el.backdrop_path
                    }
                })];
            });
            setHasMore(res.data.results.length > 0);
            setLoading(false);
            //console.log(res.data);
        }).catch(e => {
            if(axios.isCancel(e)) return;
            setError(true);
        })
        return () => cancel();
    }, [query, pageNumber]);

    return { loading, error, movies, hasMore };
}
