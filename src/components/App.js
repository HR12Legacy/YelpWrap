import React from 'react';
import Search from './Search.js';
import EntryList from './EntryList.js';
const axios = require('axios');
import GoogleApiWrapper from './MyMapComponent';
import sample from '../../sampledata.js'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      results: sample.businesses,
      location: {},
    }
    this.searchHandler = this.searchHandler.bind(this);
  }



  getPosition(options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
  
  componentDidMount() {
    // this.searchHandler();
    const currentState = this.state;
    this.getPosition()
    .then(result => {
      currentState.location.latitude = result.coords.latitude;
      currentState.location.longitude = result.coords.longitude;
      this.setState({ currentState });
    })
    .catch(err => console.error(err));
  }

  searchHandler(term='delis', location='10007'){
    axios.post('/search', {term: term, location: location})
    .then((data) => {
      this.setState({results: data.data})
      console.log(this.state.results);
    })
    .catch((err) => {
      console.log('err from axios: ', err);
    });
  }

  onMarkerPositionChanged(mapProps, map) {
    console.log('mapProps', mapProps);
    console.log('lat', map.center.lat());
    console.log('lng', map.center.lng());
  };

  render() {
    return (
      <div>
        <h1> Hello World </h1>
        <Search search={this.searchHandler}/>
        <EntryList list={this.state.results}/>
        <GoogleApiWrapper  markers={this.state.results} onMarkerPositionChanged={this. onMarkerPositionChanged.bind(this)}/>
      </div>
    )
  }
}
