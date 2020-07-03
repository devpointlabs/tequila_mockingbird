import React, { Fragment, } from 'react';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import { Switch, Route, } from 'react-router-dom';
import { Container, } from "semantic-ui-react";
import FetchUser from './components/FetchUser';
import Boozes from "./components/Booze/Boozes"
import BoozeView from "./components/Booze/BoozeView"

const App = () => (
  <Fragment>
    <Navbar />
    <FetchUser>
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path='/boozes' component={Boozes}/>
        <Route exact path='/boozes/:id' component={BoozeView}/>
        <Route component={NoMatch} />
      </Switch>
    </Container>
    </FetchUser>
  </Fragment>
)

export default App;