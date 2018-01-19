import React from 'react';
import Search from './Search.js';
import EntryList from './EntryList.js';
import Chat from './Chat.js'
import ChatBot from './ChatBot.js'
const axios = require('axios');
import GoogleApiWrapper from './MyMapComponent';
import sample from '../../sampledata.js';
import styles from './entries.css'
import style from './container.css'
import ServerActions from '../ServerActions';
import Location from './Location.js'
import Profile from './Profile';
import {Tabs, Tab} from 'material-ui/Tabs'
/**
 * NOTICE:
 * npm install --save axios on production branch 
 */
//aaron was here

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      query: '',
      results: [],
      coords: {lat: 40.7137930034,
        lng: -74.0081977844},
      location: '10017',
      favorites: [],
      chatroom: {}, 
      messages: [], 
      zips: []
    }

    this.searchHandlerByZip = this.searchHandlerByZip.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
    this.generateFavorites = this.generateFavorites.bind(this);
    this.onMarkerPositionChanged = this.onMarkerPositionChanged.bind(this)
    this.onSelectZipcode = this.onSelectZipcode.bind(this)
    this.goHome = this.goHome.bind(this)
    this.getZips = this.getZips.bind(this)
    this.sendLocation = this.sendLocation.bind(this)
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
            cb(zip[1])  
          }
      )
  }
  

  componentWillReceiveProps(nextProps) {
    if(this.props.userId) this.generateFavorites();
  }

  componentDidMount() {
    this.generateFavorites()
    var that = this;
    this.getPosition()
    .then(result => {
       var lat = result.coords.latitude;
       var lng = result.coords.longitude;
       this.getZipFromCoords(lat, lng, (zip) =>

         this.setState({location: zip}, function(){
            that.searchHandlerByZip('delis', that.state.location) 
            that.setState({
              coords: {lat: lat, lng: lng}
            })  
         })
       )
    })
    .catch(err =>  () => {
      this.searchHandlerByZip();
    }) 
    this.getZips()
  }

  selectHandler(e) {
    e.preventDefault();
    if(e.target.name === 'openNow' || e.target.name === 'delivery'){
      this.setState({[e.target.name]: !this.state[e.target.name]}, () => {
        this.searchHandlerByZip(this.state.query, this.state.location, this.state.filter, this.state.sortBy, this.state.openNow, this.state.delivery);
      })
    } else {
      this.setState({[e.target.name]: e.target.value}, () => {
          this.searchHandlerByZip(this.state.query, this.state.location, this.state.filter, this.state.sortBy, this.state.openNow, this.state.delivery);
      })
     }
  }


  searchHandlerByZip(term='delis', location='10007', filter, sortBy, openNow, delivery){
    this.setState({query: term, filter: filter, sortBy: sortBy, openNow: openNow, delivery: delivery},()=>{
      axios.post('/search', {term, location, filter, sortBy, openNow, delivery})
      .then((data) => {
        this.setState({results: data.data.businesses, 
          coords: {lat: data.data.region.center.latitude, lng: data.data.region.center.longitude}
        })
      })
      .catch((err) => {
        console.log('err from axios: ', err);
      })
    })
  }

  sendLocation(location){
    this.setState({
      location: location
    })
  }

  onMarkerPositionChanged(mapProps, map) {
    var coords = {lat: map.center.lat(), lng: map.center.lng()}
    this.setState({coords: coords})
   
  };

  onSelectZipcode(){
     this.getZipFromCoords(this.state.coords.lat, this.state.coords.lng, (zip) =>
      this.setState({location: zip}, () => 
        this.searchHandlerByZip(this.state.query, zip)
      )
    )
  }

  goHome(){
    this.setState({location: this.props.user.homezip}, () => this.searchHandlerByZip(this.state.query, this.props.user.homezip))
  }

  generateFavorites(callback) {
    console.log('calling generate favorites', this.props.userId)
    if (this.props.userId) {
      ServerActions.getRequest('/favorite/'+this.props.userId, (result) => {
          this.setState({
            favorites: result.data,
          }, () => console.log(this.state.favorites))
      })
    }
  };

  toggleUsers(){
    this.setState({usersToggled : !this.state.usersToggled})
  }


  getZips(){
    axios.get('/ziproom').then((data) => this.setState({zips: data.data}))
  }

  render() {   
    return (
      <div className={style.row}>

        <div className={style.column}>
        <Search search={this.searchHandlerByZip} 
                    filterFunc={this.selectHandler} 
                    filter={this.state.filter} 
                    sortBy={this.state.sortBy} 
                    openNow={this.state.openNow} 
                    delivery={this.state.delivery} 
                    sendLocation={this.sendLocation}/>
          <div className={style.columnPaddingLeft}>    
            <div className={style.map}>
              
              <GoogleApiWrapper  zips={this.state.zips} goHome={this.goHome} onSelectZipcode={this.onSelectZipcode} faves={ this.state.favorites } markers={ this.state.results } onMarkerPositionChanged={ this.onMarkerPositionChanged} 
              xy={this.state.coords} />
            </div>

          </div>

        </div>


        <div className={style.column}>
          <div className={style.columnPaddingRight}>
            <Location location={this.state.location} top={this.state.results.length ? this.state.results[0].name : ''}/>
            <Tabs initialSelectedIndex={1}>
              <Tab label="Restaurants List" >
                <div className={styles.entryList} style={{height: '100%'}}>
                  <EntryList userId={ this.props.userId } list={this.state.results} generateFavorites={this.generateFavorites}/>
                </div>
              </Tab>
              <Tab label="Chat" >
                <Chat location={this.state.location} user={this.props.user} getZips={this.getZips}/>
              </Tab>
              <Tab label="Profile" >
                <Profile 
                  user={this.props.user}
                  list={this.state.favorites}
                  faves={this.state.favorites}
                  refreshProfile={this.props.refreshProfile}
                  style={{height: '100%'}}
                  isLoggedIn={this.props.isLoggedIn}
                />
              </Tab>
            </Tabs>

            <ChatBot location={this.state.location} restaurants={this.state.results}/>
          </div>
        </div>

      </div>
    )
  }
}

