import React, { PropTypes } from 'react';
import SignUpForm from './SignUpForm.js';
import ServerActions from '../../ServerActions.js';
import { Link, BrowserRouter } from 'react-router-dom';
import {browserHistory} from 'react-router'


class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      },
    };

    this.processForm = this.processForm.bind(this);
    this.sendForm = this.sendForm.bind(this)
    this.changeUser = this.changeUser.bind(this);
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({user});
  }

  getPosition(options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  getZipFromCoords(lat, lng, cb){
    var point = new google.maps.LatLng(lat, lng);
      new google.maps.Geocoder().geocode(
          {'latLng': point},
          function (res, status) {
            var zip = res[0].formatted_address.match(/,\s\w{2}\s(\d{5})/)
            console.log('zip', zip, zip[1])
            cb(zip[1])  
          }
      )
  }

  processForm(event) {
    event.preventDefault();
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    this.getPosition().then((result) => {
       var lat = result.coords.latitude;
       var lng = result.coords.longitude;
       this.getZipFromCoords(lat, lng, (zip) => {
         this.sendForm(name, email, password, zip)
      })
    })
    .catch(result => {
      this.sendForm(name, email, password, '10017')
    })
  }

  sendForm(name, email, password, location){
    const formData = `name=${name}&email=${email}&password=${password}&location=${location}`;
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/user');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          errors: {}
        });
        if (xhr.response.success) {
          // redirect
          console.log('should redirect')
          this.props.history.push('/')
        } else {
          alert('There is already an account associated with this email!')
        }
      } else {
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }


  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

export default SignUpPage;