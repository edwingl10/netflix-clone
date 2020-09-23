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
      <Row title="Action Movies" fetchUrl={movieRequests.fetchActionMovies} />
      <Row title="Adventure Movies" fetchUrl={movieRequests.fetchAdventureMovies} />
      <Row title="Animation Movies" fetchUrl={movieRequests.fetchAnimationMovies} />
      
    </div>
  );
}

export default Home;
