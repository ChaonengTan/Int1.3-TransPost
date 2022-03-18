import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/navbar'
import Home from './components/home'
import Post from './components/post';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Route exact path="/" component={Home}/>
        <Route path="/post/:id" component={Post}/>
        <div>footer goes here</div>
      </div>
    </Router>
  );
}

export default App;
