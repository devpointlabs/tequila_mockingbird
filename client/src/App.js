import React, { Fragment, Component } from 'react';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import { Switch, Route, Redirect} from 'react-router-dom';
import { Container, } from "semantic-ui-react";
import FetchUser from './components/FetchUser';

import Drinks from './components/Drinks/Drinks';
import DrinkView from './components/Drinks/DrinkView';

import AuthProvider from './providers/AuthProvider';
import Boozes from "./components/Booze/Boozes";
import BoozeView from "./components/Booze/BoozeView";


import Profile from "./components/Profile"
import ProtectedRoute from './components/auth/ProtectedRoute';

import SearchBar from './components/Search/SearchBar';


const App = () => (
  <Fragment>
    <Navbar />
    <FetchUser>
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute exact path='/profile' component={Profile} /> {/* We added this protected route from lecture*/}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <Route exact path="/drinks" component={Drinks} />
        <Route exact path="/drinks/:id" component={DrinkView} />

        <Route exact path='/boozes' component={Boozes}/>
          <Route exact path='/boozes/:id' component={BoozeView} />
          
        <Route exact path='/search' component={SearchBar}/>
      
        <Route component={NoMatch} />
      </Switch>
    </Container>
    </FetchUser>
  </Fragment>
)

export default App;