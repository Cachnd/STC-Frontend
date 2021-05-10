import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Fragment } from 'react';
import {Homepage, Students, Classes} from './components/layout/index'
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <Fragment>      
      <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
          <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/students" component={Students}/>
              <Route path="/classes" component={Classes}/>
          </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
