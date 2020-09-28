const API_KEY = process.env.REACT_APP_API_KEY;

export const movieRequests = {
    fetchNowPlaying: `/movie/now_playing?api_key=${API_KEY}&language=en-US`,
    fetchTrendingMovies: `/trending/movie/week?api_key=${API_KEY}&language=en-US`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&sort_by=popularity.desc`,
    fetchAdventureMovies: `/discover/movie?api_key=${API_KEY}&with_genres=12&sort_by=popularity.desc`,
    fetchAnimationMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16&sort_by=popularity.desc`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&sort_by=popularity.desc`,
    fetchCrimeMovies: `/discover/movie?api_key=${API_KEY}&with_genres=80&sort_by=popularity.desc`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99&sort_by=popularity.desc`,
    fetchDramaMovies: `/discover/movie?api_key=${API_KEY}&with_genres=18&sort_by=popularity.desc`,
    fetchFamilyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10751&sort_by=popularity.desc`,
    fetchFantasyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=14&sort_by=popularity.desc`,
    fetchHistoryMovies: `/discover/movie?api_key=${API_KEY}&with_genres=36&sort_by=popularity.desc`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&sort_by=popularity.desc`,
    fetchMusicMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10402&sort_by=popularity.desc`,
    fetchMysteryMovies: `/discover/movie?api_key=${API_KEY}&with_genres=9648&sort_by=popularity.desc`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&sort_by=popularity.desc`,
    fetchScifiMovies: `/discover/movie?api_key=${API_KEY}&with_genres=878&sort_by=popularity.desc`,
    fetchThrillerMovies: `/discover/movie?api_key=${API_KEY}&with_genres=53&sort_by=popularity.desc`,
    fetchWarMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10752&sort_by=popularity.desc`,
    fetchWesternMovies: `/discover/movie?api_key=${API_KEY}&with_genres=37&sort_by=popularity.desc`
}

export const showRequests = {
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchActionAdventureShows: `/discover/tv?api_key=${API_KEY}&with_genres=10759&sort_by=popularity.desc`,
    fetchAnimationShows: `/discover/tv?api_key=${API_KEY}&with_genres=16&sort_by=popularity.desc`,
    fetchComedyShows: `/discover/tv?api_key=${API_KEY}&with_genres=35&sort_by=popularity.desc`,
    fetchCrimeShows: `/discover/tv?api_key=${API_KEY}&with_genres=80&sort_by=popularity.desc`,
    fetchDocumentaryShows: `/discover/tv?api_key=${API_KEY}&with_genres=99&sort_by=popularity.desc`,
    fetchDramaShows: `/discover/tv?api_key=${API_KEY}&with_genres=18&sort_by=popularity.desc`,
    fetchFamilyShows: `/discover/tv?api_key=${API_KEY}&with_genres=10751&sort_by=popularity.desc`,
    fetchKidShows: `/discover/tv?api_key=${API_KEY}&with_genres=10762&sort_by=popularity.desc`,
    fetchMysteryShows: `/discover/tv?api_key=${API_KEY}&with_genres=9648&sort_by=popularity.desc`,
    fetchRealityShows: `/discover/tv?api_key=${API_KEY}&with_genres=10764&sort_by=popularity.desc`,
    fetchScifiFantasyShows: `/discover/tv?api_key=${API_KEY}&with_genres=10765&sort_by=popularity.desc`,
    fetchTalkShows: `/discover/tv?api_key=${API_KEY}&with_genres=10767&sort_by=popularity.desc`,
    fetchWarPoliticsShows: `/discover/tv?api_key=${API_KEY}&with_genres=10768&sort_by=popularity.desc`,
    fetchWesternShows: `/discover/tv?api_key=${API_KEY}&with_genres=37&sort_by=popularity.desc`
}

export const latestRequests = {
    fetchNowPlaying: `/movie/now_playing?api_key=${API_KEY}&language=en-US`,
    fetchAiringToday: `tv/airing_today?api_key=${API_KEY}&language=en-US`,
    fetchUpcoming: `/movie/upcoming?api_key=${API_KEY}&language=en-US`,
    fetchOnair: `/tv/on_the_air?api_key=${API_KEY}&language=en-US`
}

export function requestSimilar(show, id, fetch){
    return `https://api.themoviedb.org/3/${show ? "tv" : "movie"}/${id}/${fetch}?api_key=${API_KEY}&language=en-US`;
}