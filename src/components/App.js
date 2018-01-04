import React from 'react';
import Search from './Search.js';
import EntryList from './EntryList.js';
const axios = require('axios');
import GoogleApiWrapper from './MyMapComponent';

/**
 * NOTICE:
 * npm install --save axios on production branch 
 */

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      results: [],
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
    this.searchHandler();
    let currentLocation = {};
    this.getPosition()
    .then(result => {
      currentLocation.latitude = result.coords.latitude
      currentLocation.longitude = result.coords.longitude
      this.setState({ location: currentLocation });
    })
    .catch(err => console.error(err));
  }

  searchHandler(term='delis', location='10007'){
    axios.post('/search', {term: term, location: location})
    .then((data) => {
      this.setState({results: data.data})
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
        <GoogleApiWrapper  onMarkerPositionChanged={this. onMarkerPositionChanged.bind(this)}/>
      </div>
    )
  }
}
