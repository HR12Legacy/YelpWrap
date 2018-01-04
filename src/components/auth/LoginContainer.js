import React, { PropTypes } from 'react';
import LoginForm from './LoginForm.js';
import ServerActions from '../../ServerActions.js';
import { Redirect } from 'react-router'



class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      user: {
        username: ' ',
        password: ' '
      },
      redirect: false,
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(event) {
    event.preventDefault();
    ServerActions.postRequest('/login', this.state.user, (result) => {
      if(result) {
        localStorage.setItem('user', JSON.stringify(this.state.user.email));
        const curr = this.state;
        curr.redirect = !curr.redirect;
        this.setState({curr}, console.log(this.state.redirect));
      }
    })

    // console.log('email:', this.state.user.email);
    // console.log('password:', this.state.user.password);
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  render() {
      return (
        <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
      )
  }

}

export default LoginPage;
