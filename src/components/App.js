import React from 'react';
import Search from './Search.js';
import EntryList from './EntryList.js';
const axios = require('axios');
import GoogleApiWrapper from './MyMapComponent';
import sample from '../../sampledata.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      query: '',
      results: [],
      coords: {},
      location: '',
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
    this.searchHandlerByZip();
    this.getPosition()
    .then(result => {
      this.setState({ coords: result.coords }, ()=>{
        // console.log('inside comp did mount',this.state);
        this.searchHandlerByCoords(this.state.query, this.state.coords.latitude, 
        this.state.coords.longitude)
      });
    })
    .catch(err => console.error(err));
  }

  searchHandlerByZip(term='delis', location='10007'){
    this.setState({query: term},()=>{console.log('query from state in app searchByZip',this.state.query)})
    axios.post('/search', {term: term, location: location})
    .then((data) => {
      this.setState({results: data.data})
      // console.log('State change in SearchByZip', this.state.results);
      // console.log('query from state in app searchByZip',this.state.query);
    })
    .catch((err) => {
      console.log('err from axios: ', err);
    });
  }

  searchHandlerByCoords(term, lat, lng){
    axios.post('/search', {term, lat, lng})
    .then((data) => {
      this.setState({results: data.data})
      // console.log(this.state.results);
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
      <div style={{height: '200px'}}>
        <Search search={this.searchHandlerByZip}/>
        <EntryList list={this.state.results} style={{display: 'block'}}/>
        <GoogleApiWrapper  markers={this.state.results} onMarkerPositionChanged={this.onMarkerPositionChanged.bind(this)} />
      </div>
    )
  }
}
