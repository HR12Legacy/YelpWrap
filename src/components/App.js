import React from 'react';
import Search from './Search.js';
import EntryList from './EntryList.js';
const axios = require('axios');
import GoogleApiWrapper from './MyMapComponent';
import sample from '../../sampledata.js';
import styles from './entries.css'
import style from './container.css'
import ServerActions from '../ServerActions';
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
      coords: {lat: 48.61021668181817,
        lng: 9.103665540909093},
      location: '',
      favorites: [],
    }
    this.searchHandlerByZip = this.searchHandlerByZip.bind(this);
    this.searchHandlerByCoords = this.searchHandlerByCoords.bind(this);
    this.generateFavorites = this.generateFavorites.bind(this);
  }
  
  getPosition(options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
  
  componentWillReceiveProps(nextProps) {
    if(this.props.userId) this.generateFavorites();
  }

  componentDidMount() {
    this.searchHandlerByZip();

    this.getPosition()
    .then(result => {
      this.setState({ coords: {lat: result.coords.latitude, lng: result.coords.longitude} }, ()=>{
        this.searchHandlerByCoords(this.state.query, this.state.coords.lat, 
        this.state.coords.lng)
      }
    )})
    .catch(err => console.error(err));
  }

  searchHandlerByZip(term='delis', location='10007'){
    this.setState({query: term})
    axios.post('/search', {term: term, location: location})
    .then((data) => {
      this.setState({results: data.data})
      this.setState({coords: {lat: data.data.region.center.latitude, lng: data.data.region.center.longitude}}, ()=>{console.log('state coords',this.state.coords)})

    })
    .catch((err) => {
      console.log('err from axios: ', err);
    });
  }

  searchHandlerByCoords(term='delis', lat, lng){
    axios.post('/search', {term, lat, lng})
    .then((data) => {
      this.setState({results: data.data})
    })
    .catch((err) => {
      console.log('err from axios: ', err);
    });
  }

  onMarkerPositionChanged(mapProps, map) {
    var coords = {lat: map.center.lat(), lng: map.center.lng()}
    this.setState({coords: coords},()=>{this.searchHandlerByCoords(this.state.query, this.state.coords.lat, this.state.coords.lng)})
  };


  generateFavorites(callback) {
    // UPDATE DATABASE TO STORE SAME THINGS AS REQUIRED FOR GRID
    if (this.props.userId) {
      ServerActions.getRequest('/favorite/'+this.props.userId, (result) => {
        console.log('result', result)
        debugger;
          this.setState({
            favorites: result.data,
          }, ()=> console.log(this.state.favorites))
      })
    }
  };


  render() {    
    return (
      <div style={{height: '200px'}}>
        <Search search={this.searchHandlerByZip}/>
        <div className={styles.entryList}>
          <EntryList list={this.state.results}/>
        </div>
        <div className={styles.entryList} data-type="favorites">
          <EntryList userId={ this.props.userId } list={this.state.favorites}/>
        </div>
        <div className={style.map}>
          <GoogleApiWrapper  markers={this.state.results} onMarkerPositionChanged={this.onMarkerPositionChanged.bind(this)} 
          xy={this.state.coords} />
        </div>
      </div>
    )
  }
}
