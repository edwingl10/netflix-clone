import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Movie from './pages/Movie';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/:id" component={Movie} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
