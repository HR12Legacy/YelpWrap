import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LoginPage from './components/auth/LoginContainer.js';
import SignUpPage from './components/auth/SignUpContainer.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { HashRouter, Route, Link, Redirect } from 'react-router-dom';
import style from './base.css';
import Header from './components/Header';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import axios from 'axios';

injectTapEventPlugin();

class Base extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userId: null,
      user: {},
    }
    this.refreshProfile = this.refreshProfile.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(id, user) {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
      userId: id,
      user: user
    }, ()=> console.log(this.state));
  }

  refreshProfile() {
    axios.get('/user/' + this.state.userId)
      .then((result)=> {
        this.setState({
          user: result.data
        })
      })
  }

  render() {
    return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <HashRouter>
        <div>
        <Header links={
          <div>
            <div className={style.topBar}>
              <div className={style.topBarLeft}>
                <Link to="/">
                <IconButton
                  iconStyle={style.large}
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
          </div>
          }/>    
          
          <hr/>
            <Route exact path='/' render={() => {
              return <App 
                userId={this.state.userId}
                user={this.state.user}
                refreshProfile={this.refreshProfile}
                />
            }}/>

           {/* <Route path='/login' render={() => {
                         <Route path='/' component={App} />
                         return (
                           <LoginPage 
                             login={this.handleLogin.bind(this)}
                             faves={this.generateFavorites}
                           />
                         )
                       }}/>*/}

            <Route path='/login' render={() => {
              return (this.state.isLoggedIn) ? <Redirect to="/" /> : <LoginPage login={this.handleLogin} faves={this.generateFavorites}/>
            }}/>
            <Route path='/signup' component={SignUpPage} />

        </div>
      </HashRouter>
    </MuiThemeProvider>
    )
  }
}

export default Base;