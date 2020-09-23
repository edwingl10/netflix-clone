import React from 'react';
import './Home.css';
import Row from '../components/Row';
import { movieRequests, showRequests } from '../requests';
import Banner from '../components/Banner';

function Home() {
  return (
    <div className="home">
      <Banner />

      <Row title="NETFLIX ORIGINALS" fetchUrl={showRequests.fetchNetflixOriginals} isLargeRow show />
      <Row title="Trending" fetchUrl={movieRequests.fetchTrendingMovies} />
      <Row title="Top Rated" fetchUrl={movieRequests.fetchTopRated} />

      <Row title="Action" fetchUrl={movieRequests.fetchActionMovies} />
      <Row title="Adventure" fetchUrl={movieRequests.fetchAdventureMovies} />
      <Row title="Animation Shows" fetchUrl={showRequests.fetchAnimationShows} show />
      <Row title="Comedy Movies" fetchUrl={movieRequests.fetchComedyMovies} />
      <Row title="Crime Shows" fetchUrl={showRequests.fetchCrimeShows} show />
      <Row title="Drama Shows" fetchUrl={showRequests.fetchDramaShows} show />
      <Row title="Documentaries" fetchUrl={showRequests.fetchDocumentaryShows} show />
      <Row title="Family Movies" fetchUrl={movieRequests.fetchFamilyMovies} />
      <Row title="Fantasy" fetchUrl={movieRequests.fetchFantasyMovies} />
      <Row title="History" fetchUrl={movieRequests.fetchHistoryMovies} />
      <Row title="Horror" fetchUrl={movieRequests.fetchHorrorMovies} />
      <Row title="Kids" fetchUrl={showRequests.fetchKidShows} show />
      <Row title="Mystery Shows" fetchUrl={showRequests.fetchMysteryShows} show />
      <Row title="News" fetchUrl={showRequests.fetchNewsShows} show />
      <Row title="Reality" fetchUrl={showRequests.fetchRealityShows} show />
      <Row title="Romance" fetchUrl={movieRequests.fetchRomanceMovies} />
      <Row title="Scifi" fetchUrl={movieRequests.fetchScifiMovies} />
      <Row title="Talk" fetchUrl={showRequests.fetchTalkShows} show />
      <Row title="Thriller" fetchUrl={movieRequests.fetchThrillerMovies} />
      <Row title="War" fetchUrl={movieRequests.fetchWarMovies} />
      <Row title="Western Movies" fetchUrl={movieRequests.fetchWesternMovies} />
      <Row title="Action & Adventure" fetchUrl={showRequests.fetchActionAdventureShows} show />
      <Row title="Animation Movies" fetchUrl={movieRequests.fetchAnimationMovies} />
      <Row title="Comedy Shows" fetchUrl={showRequests.fetchComedyShows} show />
      <Row title="Crime Movies" fetchUrl={movieRequests.fetchCrimeMovies} />
      <Row title="Drama Movies" fetchUrl={movieRequests.fetchDramaMovies} />
      <Row title="Family Shows" fetchUrl={showRequests.fetchFamilyShows} show />
      <Row title="Music" fetchUrl={movieRequests.fetchMusicMovies} />
      <Row title="Mystery Movies" fetchUrl={movieRequests.fetchMysteryMovies} />
      <Row title="Scifi & Fantasy" fetchUrl={showRequests.fetchScifiFantasyShows} show />
      <Row title="War & Politics" fetchUrl={showRequests.fetchWarPoliticsShows} show />
      
    </div>
  );
}

export default Home;
