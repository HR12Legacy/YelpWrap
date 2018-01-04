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
      coords: {lat: 48.61021668181817,
        lng: 9.103665540909093},
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
      this.setState({ coords: {lat: result.coords.latitude, lng: result.coords.longitude} }, ()=>{
        this.searchHandlerByCoords(this.state.query, this.state.coords.lat, 
        this.state.coords.lng)
      }
    );
        console.log('348917234987>>>>', result.coords)
    })
    .catch(err => console.error(err));
  }

  searchHandlerByZip(term='delis', location='10007'){
    this.setState({query: term})
    axios.post('/search', {term: term, location: location})
    .then((data) => {
      this.setState({results: data.data.businesses})
      this.setState({coords: {lat: data.data.region.center.latitude, lng: data.data.region.center.longitude}}, ()=>{console.log('state coords',this.state.coords)})
      // console.log('State change in SearchByZip', this.state.results);
      // console.log('query from state in app searchByZip',this.state.query);
    })
    .catch((err) => {
      console.log('err from axios: ', err);
    });
  }

  searchHandlerByCoords(term='delis', lat, lng){
    axios.post('/search', {term, lat, lng})
    .then((data) => {
      this.setState({results: data.data.businesses})
    })
    .catch((err) => {
      console.log('err from axios: ', err);
    });
  }

  onMarkerPositionChanged(mapProps, map) {
    console.log('map', map);
    console.log('mapProp', mapProps)
    console.log('lat', map.center);
    console.log('lng', map.center.lng());
    var coords = {latitude: map.center.lat(), longitude: map.center.lng()}
    this.setState({coords: coords},()=>{this.searchHandlerByCoords(this.state.query, this.state.coords.latitude, this.state.coords.longitude)})
  };

  render() {
    return (
      <div style={{height: '200px'}}>
        <h1> Hello World </h1>
        <Search search={this.searchHandlerByZip}/>
        <EntryList list={this.state.results} style={{display: 'block'}}/>
        <GoogleApiWrapper  markers={this.state.results} onMarkerPositionChanged={this.onMarkerPositionChanged.bind(this)} 
        xy={this.state.coords} />
      </div>
    )
  }
}
