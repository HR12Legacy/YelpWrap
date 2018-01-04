import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import Base from './Base.js'
import routes from './frontend-routes.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { BrowserRouter, BrowserHistory } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

const newHistory = createBrowserHistory();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
	  <MuiThemeProvider muiTheme={getMuiTheme()}>
	    <BrowserRouter routes={routes} />
	  </MuiThemeProvider>, 
	  document.getElementById('root')
  );
});