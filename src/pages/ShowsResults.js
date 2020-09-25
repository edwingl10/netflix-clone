import React from 'react';
import { showRequests } from '../requests';
import Row from '../components/Row';

function ShowsResults(){
    return(
        <div style={{marginTop: "100px"}}>
            <Row title="NETFLIX ORIGINALS" fetchUrl={showRequests.fetchNetflixOriginals} show />
            <Row title="Action Adventure" fetchUrl={showRequests.fetchActionAdventureShows} show />
            <Row title="Drama" fetchUrl={showRequests.fetchDramaShows} show />
            <Row title="Crime" fetchUrl={showRequests.fetchCrimeShows} show />
            <Row title="Scifi Fantasy" fetchUrl={showRequests.fetchScifiFantasyShows} show />
            <Row title="Animation" fetchUrl={showRequests.fetchAnimationShows} show />
            <Row title="Mystery" fetchUrl={showRequests.fetchMysteryShows} show />
            <Row title="Reality" fetchUrl={showRequests.fetchRealityShows} show />
            <Row title="Family" fetchUrl={showRequests.fetchFamilyShows} show />
            <Row title="Kids" fetchUrl={showRequests.fetchKidShows} show />
            <Row title="Comedy" fetchUrl={showRequests.fetchComedyShows} show />
            <Row title="Documentaries" fetchUrl={showRequests.fetchDocumentaryShows} show />
            <Row title="Talk" fetchUrl={showRequests.fetchTalkShows} show />
            <Row title="War & Politics" fetchUrl={showRequests.fetchWarPoliticsShows} show />
            <Row title="Western" fetchUrl={showRequests.fetchWesternShows} show />
        </div>
    );
}
export default ShowsResults;