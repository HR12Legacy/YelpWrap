
// import { Link, Navlink } from 'react-router-dom';


import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LoginPage from './components/auth/LoginContainer.js';
import SignUpPage from './components/auth/SignUpContainer.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { HashRouter, Route, Link } from 'react-router-dom';
import style from './base.css';

injectTapEventPlugin();

const Base = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <HashRouter>
      <div>

        <div className={style.topBar}>
          <div className={style.topBarLeft}>
            <Link to="/">Home</Link>
          </div>

          <div className={style.topBarRight}>
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </div>

        </div>

        <switch>
          <Route path='/' component={App} />
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignUpPage} />
        </switch>

      </div>
    </HashRouter>
  </MuiThemeProvider>
);

export default Base;