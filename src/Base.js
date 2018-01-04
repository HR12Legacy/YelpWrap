
// import { Link, Navlink } from 'react-router-dom';


import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import routes from './frontend-routes.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import LoginPage from './components/auth/LoginContainer.js';
import SignUpPage from './components/auth/SignUpContainer.js';
import injectTapEventPlugin from 'react-tap-event-plugin';


const Base = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <BrowserRouter>
      <div>
      
        <div className="top-bar">
          <div className="top-bar-left">
            <Link to="/">Home</Link>
          </div>

          <div className="top-bar-right">
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
    </BrowserRouter>
  </MuiThemeProvider>
);


// Base.propTypes = {
//   children: PropTypes.object.isRequired
// };
``
export default Base;