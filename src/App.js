import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Movie from './pages/Movie';
import ShowsResults from './pages/ShowsResults';
import MoviesResults from './pages/MoviesResults';
import MyList from './pages/MyList';
import NowPlaying from './pages/NowPlaying';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/search" component={SearchResults} />
        <Route path="/shows" component={ShowsResults} />
        <Route path="/movies" component={MoviesResults} />
        <Route path="/new" component={NowPlaying} />
        <Route path="/mylist" component={MyList} />
        <Route path="/:media/:id" component={Movie} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
