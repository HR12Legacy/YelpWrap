import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LoginPage from './components/auth/LoginContainer.js';
import SignUpPage from './components/auth/SignUpContainer.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { HashRouter, Route, Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import style from './base.css';

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
          <div className={style.topBar}>
            <div className={style.topBarLeft}>
              <Link to="/">
                <IconButton
                  iconStyle={style.largeIcon}
                  style={style.large}
                  tooltip="Home"
                >
                  <ActionHome/>
                </IconButton> 
              </Link>
            </div>

            <div className={style.topBarRight}>
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