import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/navbar'
import Home from './components/home'
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Route exact path="/" component={Home}/>
        <div>footer goes here</div>
      </div>
    </Router>
  );
}

export default App;
