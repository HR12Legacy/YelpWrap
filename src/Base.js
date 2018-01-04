import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LoginPage from './components/auth/LoginContainer.js';
import SignUpPage from './components/auth/SignUpContainer.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { HashRouter, Route, Link } from 'react-router-dom';

injectTapEventPlugin();

class Base extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    }
  }

  handleLogin(e) {
    e.preventDefault();
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    })
  }


  render() {
    const isLoggedIn = localStorage.getItem('loggedIn')
    return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <HashRouter>
        <div>

          <div className="top-bar">
            <div className="top-bar-left">
              <Link to="/">Home</Link>
            </div>

            <div className="top-bar-right">
              {
                !this.state.isLoggedIn ? 
                <div>
                  <Link to="/login">Log in</Link>
                  <Link to="/signup">Sign up</Link> 
                </div> :
                <div onClick={this.handleLogin.bind(this)}> Logout </div>
              }
            </div>

          </div>

          <switch>
            <Route path='/' component={App} />

            <Route path='/login' render={() => {
              return (
                <LoginPage 
                  login={this.handleLogin.bind(this)}
                />
              )
            }}/>

            <Route path='/signup' component={SignUpPage} />

          </switch>

        </div>
      </HashRouter>
    </MuiThemeProvider>
    )
  }
}

export default Base;