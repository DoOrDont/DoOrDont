import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import List from '../components/List.jsx';
import LogInForm from '../components/LogInForm.jsx';
import SignUpForm from '../components/SignUpForm.jsx';
import CreateGoal from '../components/CreateGoal.jsx';
import Punishments from '../components/Punishments.jsx';
import Review from '../components/Review.jsx';
import AppBarNav from '../components/AppBar.jsx';


export default () => (
  <MuiThemeProvider>
    <BrowserRouter>
      <div>
        <Route component={AppBarNav} />
        <Route path='/' exact component={List} />
        <Route path='/login' exact component={LogInForm} />
        <Route path='/signup' exact component={SignUpForm} />
        <Route path='/creategoal' exact component={CreateGoal} />
        <Route path='/punishment' exact component={Punishments} />
        <Route path='/review' exact component={Review} />
      </div>
    </BrowserRouter>
  </MuiThemeProvider>
)