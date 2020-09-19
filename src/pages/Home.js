import React from 'react';
import './Home.css';
import Row from '../components/Row';
import { movieRequests, showRequests } from '../requests';
import Banner from '../components/Banner';

function Home() {
  return (
    <div className="home">
      <Banner />

      <Row title="NETFLIX ORIGINALS" fetchUrl={showRequests.fetchNetflixOriginals} isLargeRow/>
      <Row title="test" fetchUrl={movieRequests.fetchActionMovies} />
    </div>
  );
}

export default Home;
