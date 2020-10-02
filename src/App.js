import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Maintenance from "../src/Components/Maintenance";
import Mover from "./Components/Mover";
import ListofTrains from "./Components/ListofTrains";
import ListofStops from "./Components/ListofStops";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className='App'>
        <nav>
          <ul>
            <li>
              <Link className='link' to='/'>
                Trains
              </Link>
            </li>
            <li>
              <Link className='link' to='/stops'>
                Stops
              </Link>
            </li>
            <li>
              <Link className='link' to='/mover'>
                Mover
              </Link>
            </li>
            <li>
              <Link className='link' to='/maintenance'>
                Maintenance
              </Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path='/'>
            <ListofTrains />
          </Route>
          <Route exact path='/stops'>
            <ListofStops />
          </Route>
          <Route exact path='/mover'>
            <Mover />
          </Route>
          <Route exact path='/maintenance'>
            <Maintenance />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
