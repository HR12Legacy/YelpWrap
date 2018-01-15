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
    this.selectHandler = this.selectHandler.bind(this);
    this.searchHandlerByCoords = this.searchHandlerByCoords.bind(this);
    this.generateFavorites = this.generateFavorites.bind(this);
  }
  
  getPosition(options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
  
  componentWillReceiveProps(nextProps) {
    console.log(this.props.userId)
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

  selectHandler(e) {
    e.preventDefault();
    console.log('e.taget', e.target.name)
    if(e.target.name === 'openNow' || e.target.name === 'delivery'){
      this.setState({[e.target.name]: !this.state[e.target.name]}, ()=>{console.log('select handler', this.state);
        this.searchHandlerByCoords(this.state.query, this.state.coords.lat, 
          this.state.coords.lng, this.state.filter, this.state.sortBy, this.state.openNow, this.state.delivery);
      })
    }else{
      this.setState({[e.target.name]: e.target.value}, ()=>{console.log('select handler yah',this.state);
        this.searchHandlerByCoords(this.state.query, this.state.coords.lat, 
          this.state.coords.lng, this.state.filter, this.state.sortBy, this.state.openNow, this.state.delivery);
      })
    }
  }

  searchHandlerByZip(term='delis', location='10007', filter, sortBy, openNow, delivery){
    this.setState({query: term, filter: filter, sortBy: sortBy, openNow: openNow, delivery: delivery},()=>{
      axios.post('/search', {term, location, filter, sortBy, openNow, delivery})
      .then((data) => {
        console.log(data)
        this.setState({results: data.data.businesses, 
          coords: {lat: data.data.region.center.latitude, lng: data.data.region.center.longitude}
        })
      })
      .catch((err) => {
        console.log('err from axios: ', err);
      })
    })
  }

  searchHandlerByCoords(term='delis', lat, lng){
    axios.post('/search', {term, lat, lng})
    .then((data) => {
      this.setState({results: data.data.businesses, 
        coords: {lat: data.data.region.center.latitude, lng: data.data.region.center.longitude}},()=>{
          console.log('fixing coords', data)
        })
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
    if (this.props.userId) {
      ServerActions.getRequest('/favorite/'+this.props.userId, (result) => {
        console.log('result', result)
          this.setState({
            favorites: result.data,
          }, ()=> console.log(this.state.favorites))
      })
    }
  };


  render() {    
    return (
      <div style={{height: '200px'}}>
        <Search search={this.searchHandlerByZip} filterFunc={this.selectHandler} 
        filter={this.state.filter} 
        sortBy={this.state.sortBy} openNow={this.state.openNow} delivery={this.state.delivery}/>
        <div className={styles.entryList}>
          <EntryList userId={ this.props.userId } list={this.state.results}/>
        </div>
        <div className={styles.entryList} data-type="favorites">
          <EntryList faves={ this.state.favorites } userId={ this.props.userId } list={this.state.favorites}/>
        </div>
        <div className={style.map}>
          <GoogleApiWrapper  faves={ this.state.favorites } markers={ this.state.results } onMarkerPositionChanged={ this.onMarkerPositionChanged.bind(this) } 
          xy={this.state.coords} />
        </div>
      </div>
    )
  }
}
