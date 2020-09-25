import React from 'react';
import { latestRequests } from '../requests';
import Row from '../components/Row';

function NowPlaying(){
    return(
        <div style={{marginTop: "100px"}}>
            <Row title="Now Playing" fetchUrl={latestRequests.fetchNowPlaying} />
            <Row title="Airing Today" fetchUrl={latestRequests.fetchAiringToday} show/>
            <Row title="Upcoming" fetchUrl={latestRequests.fetchUpcoming} />
            <Row title="On Air" fetchUrl={latestRequests.fetchOnair} show />
        </div>
    )
}
export default NowPlaying;