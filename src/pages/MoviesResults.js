import React from 'react';
import { movieRequests } from '../requests';
import Row from '../components/Row';

function MoviesResults(){
    return(
        <div style={{marginTop: "100px"}}>
            <Row title="Top Rated" fetchUrl={movieRequests.fetchTopRated} />
            <Row title="Trending" fetchUrl={movieRequests.fetchTrendingMovies} />
            <Row title="Action" fetchUrl={movieRequests.fetchActionMovies} />
            <Row title="Comedy" fetchUrl={movieRequests.fetchComedyMovies} />
            <Row title="Scifi" fetchUrl={movieRequests.fetchScifiMovies} />
            <Row title="Thriller" fetchUrl={movieRequests.fetchThrillerMovies} />
            <Row title="War" fetchUrl={movieRequests.fetchWarMovies} />
            <Row title="Family" fetchUrl={movieRequests.fetchFamilyMovies} />
            <Row title="Adventure" fetchUrl={movieRequests.fetchAdventureMovies} />
            <Row title="Crime" fetchUrl={movieRequests.fetchCrimeMovies} />
            <Row title="Fantasy" fetchUrl={movieRequests.fetchFantasyMovies} />
            <Row title="Animation" fetchUrl={movieRequests.fetchAnimationMovies} />
            <Row title="Horror" fetchUrl={movieRequests.fetchHorrorMovies} />
            <Row title="Drama" fetchUrl={movieRequests.fetchDramaMovies} />
            <Row title="Mystery" fetchUrl={movieRequests.fetchMysteryMovies} />
            <Row title="Documentaries" fetchUrl={movieRequests.fetchDocumentaries} />
            <Row title="Music" fetchUrl={movieRequests.fetchMusicMovies} />
            <Row title="Rommance" fetchUrl={movieRequests.fetchRomanceMovies} />
            <Row title="History" fetchUrl={movieRequests.fetchHistoryMovies} />
            <Row title="Western" fetchUrl={movieRequests.fetchWesternMovies} />
        </div>
    )
}
export default MoviesResults;