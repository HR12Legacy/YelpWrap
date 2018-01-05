import React from 'react';
import Search from './Search.js';
import EntryList from './EntryList.js';
const axios = require('axios');
import GoogleApiWrapper from './MyMapComponent';
<<<<<<< HEAD
import sample from '../../sampledata.js';
import styles from './entries.css'
import style from './container.css'
=======
import sample from '../../sampledata.js'
<<<<<<< HEAD


=======
import style from './container.css';
>>>>>>> header
>>>>>>> f378e85002826b38f9c29b53f8b205941293b524
/**
 * NOTICE:
 * npm install --save axios on production branch 
 */
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      query: '',
      results: [],
      filter: '',
      sortBy: '',
      openNow: false,
      delivery: false,
      coords: {lat: 48.61021668181817,
        lng: 9.103665540909093},
      location: ''
    }
    this.searchHandlerByZip = this.searchHandlerByZip.bind(this);
    this.searchHandlerByCoords = this.searchHandlerByCoords.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
  }
<<<<<<< HEAD



=======
<<<<<<< HEAD
  
=======
>>>>>>> header
>>>>>>> f378e85002826b38f9c29b53f8b205941293b524
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
        this.state.coords.lng, this.state.filter, this.state.sortBy, this.state.openNow, this.state.delivery)
      }
    );

    })
    .catch(err => console.error(err));
  }
<<<<<<< HEAD

  selectHandler(e) {
    e.preventDefault();
    if(e.target.name === 'openNow' || e.target.name === 'delivery'){
      this.setState({[e.target.name]: !this.state[e.target.name]}, ()=>{console.log(this.state);
        this.searchHandlerByCoords(this.state.query, this.state.coords.lat, 
          this.state.coords.lng, this.state.filter, this.state.sortBy, this.state.openNow, this.state.delivery);
      })
    }else{
      this.setState({[e.target.name]: e.target.value}, ()=>{console.log(this.state);
        this.searchHandlerByCoords(this.state.query, this.state.coords.lat, 
          this.state.coords.lng, this.state.filter, this.state.sortBy, this.state.openNow, this.state.delivery);
      })
    }
  }

  searchHandlerByZip(term='delis', location='10007', filter, sortBy, openNow, delivery){
    this.setState({query: term, filter: filter, sortBy: sortBy, openNow: openNow, delivery: delivery},()=>{
      axios.post('/search', {term, location, filter, sortBy, openNow, delivery})
      .then((data) => {
        this.setState({results: data.data.businesses, 
          coords: {lat: data.data.region.center.latitude, lng: data.data.region.center.longitude}
        }, 
          ()=>{console.log('ZIP state coords',this.state.coords); 
      console.log(' ZIP BY region ===>>>>', data.data.region.center);

        })
      })
      .catch((err) => {
        console.log('err from axios: ', err);
      })
=======
  searchHandlerByZip(term='delis', location='10007'){
    this.setState({query: term})
    axios.post('/search', {term: term, location: location})
    .then((data) => {
      this.setState({results: data.data})
      this.setState({coords: {lat: data.data.region.center.latitude, lng: data.data.region.center.longitude}}, ()=>{console.log('state coords',this.state.coords)})

>>>>>>> f378e85002826b38f9c29b53f8b205941293b524
    })
  }
<<<<<<< HEAD

  searchHandlerByCoords(term='delis', lat, lng, filter, sortBy, openNow, delivery){
    axios.post('/search', {term, lat, lng, filter, sortBy, openNow, delivery})
    .then((data) => {
      this.setState({results: data.data.businesses, coords: {lat: data.data.region.center.latitude, lng: data.data.region.center.longitude}}, ()=>{
        console.log('BY COORDS1===>>>>', this.state.coords)
        console.log('BY REGION ===>>>>', data.data.region.center)
      })
=======
  searchHandlerByCoords(term='delis', lat, lng){
    axios.post('/search', {term, lat, lng})
    .then((data) => {
      this.setState({results: data.data})
>>>>>>> f378e85002826b38f9c29b53f8b205941293b524
    })
    .catch((err) => {
      console.log('err from axios: ', err);
    });
  }
<<<<<<< HEAD

<<<<<<< HEAD
  onMarkerPositionChanged(mapProps, map) {
    var coords = {lat: map.center.lat(), lng: map.center.lng()}
    this.setState({coords: coords},
      ()=>{this.searchHandlerByCoords(this.state.query, this.state.coords.lat, 
        this.state.coords.lng, this.state.filter, this.state.sortBy, 
        this.state.openNow, this.state.delivery)})
  }
=======
  onMarkerPositionChanged(mapProps, map) {
=======
  //Chris has this utilized on his branch:
  onMarkerPositionChanged(mapProps, map) {
    console.log('map', map);
    console.log('mapProp', mapProps)
>>>>>>> header
    var coords = {lat: map.center.lat(), lng: map.center.lng()}
    this.setState({coords: coords},()=>{this.searchHandlerByCoords(this.state.query, this.state.coords.lat, this.state.coords.lng)})
  };
>>>>>>> f378e85002826b38f9c29b53f8b205941293b524

  
  render() {    
    return (
<<<<<<< HEAD
      <div style={{height: '200px'}}>
        <h1> Hello World </h1>
        
        <Search search={this.searchHandlerByZip} filterFunc={this.selectHandler} filter={this.state.filter} 
        sortBy={this.state.sortBy} openNow={this.state.openNow} delivery={this.state.delivery}/>

        <EntryList list={this.state.results} style={{display: 'block'}}/>
        <GoogleApiWrapper  markers={this.state.results} onMarkerPositionChanged={this.onMarkerPositionChanged.bind(this)} 
        xy={this.state.coords} />
=======
      <div className={style.appContainer} >
        <Search search={this.searchHandlerByZip}/>
<<<<<<< HEAD
        <div className={styles.entryList}>
          <EntryList list={this.state.results}/>
        </div>
        <div className={styles.entryList}>
          <EntryList list={this.state.results}/>
        </div>
        <div className={style.map}>
          <GoogleApiWrapper  markers={this.state.results} onMarkerPositionChanged={this.onMarkerPositionChanged.bind(this)} 
          xy={this.state.coords} />
        </div>
=======
        <EntryList list={this.state.results}/>
        <FavEntryList list={this.state.results}/>
        <GoogleApiWrapper  
          markers={this.state.results} 
          onMarkerPositionChanged={this.onMarkerPositionChanged.bind(this)}
          xy={this.state.coords} 
        />
>>>>>>> header
>>>>>>> f378e85002826b38f9c29b53f8b205941293b524
      </div>
    )
  }
}