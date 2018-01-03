import React from 'react';
import Search from './Search.js';
import EntryList from './EntryList.js';
const axios = require('axios');
import GoogleApiWrapper from './MyMapComponent';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      results: [],
      coords: {},
      location: ''
    }
    this.searchHandlerByZip = this.searchHandlerByZip.bind(this);
    this.searchHandlerByCoords = this.searchHandlerByCoords.bind(this);
  }

  getPosition(options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
  
  componentDidMount() {
    // this.searchHandler();
    this.getPosition()
    .then(result => {
      this.setState({ coords: result.coords });
      console.log('state coords', this.state.coords.latitude)
      this.searchHandlerByCoords('jackie', this.state.coords)
    })
    .catch(err => console.error(err));
  }

  searchHandlerByZip(term='delis', location='10007'){
    axios.post('/search', {term: term, location: location})
    .then((data) => {
      this.setState({results: data.data})
      console.log(this.state.results);
    })
    .catch((err) => {
      console.log('err from axios: ', err);
    });
  }

  searchHandlerByCoords(term, coords){
    axios.post('/search', {term: term, coords: coords})
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
        <Search search={this.searchHandlerByZip}/>
        <EntryList list={this.state.results}/>
        <GoogleApiWrapper  onMarkerPositionChanged={this.onMarkerPositionChanged.bind(this)}/>
      </div>
    )
  }
}
