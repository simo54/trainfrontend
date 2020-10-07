import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Maintenance from "../src/Components/Maintenance";
import Mover from "./Components/Mover";
import MainView from "./Components/MainOverview";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className='App'>
        <nav>
          <ul>
            <li>
              <Link className='link' to='/'>
                Main View
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
            <MainView />
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
