import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
const CaretUp = require("react-icons/lib/fa/caret-up");
import keys from '../../config';
import style from './container.css';
import star from 'material-ui/svg-icons/toggle/star';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
const zipcodes = require('zipcodes')
const axios = require('axios')

const ZipUser = (props) => ( 
  <div>
  <h3> {props.name} </h3>
  <img style={{height: '40px', width: '40px'}} src={props.img} alt=""/>
  </div>
  )


class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      showingZipUsers: false, 
      activeMarker: {},
      activeZip: {},
      info:{},
      loc: '', 
      users: []
     
    }
    this.onMarkerHover = this.onMarkerHover.bind(this);
    this.onClick = this.onClick.bind(this)
  }
  onMarkerHover(props, marker, event) {

    this.setState({
      showingInfoWindow: !this.state.showingInfoWindow,
      activeMarker: marker,
      info: props.info
    })
  }

  onClick(props, marker, event){
    console.log('props', props)
    axios.get('/users/' + props.info)
    .then((data) => {
      if (data.data.length){
        this.setState({users: data.data})
      } 
      this.setState({activeZip: marker, showingZipUsers: !this.state.showingZipUsers})
    })
  }
  

  render() {
      const mapStyle = {
        'height': '100%', 
        'width': '100%',
        'overflow': 'hidden',
        'paddingBottom': '22.25%',
        'paddingTop': '30px',
        'position': 'absolute',
      } 

      return (
        <span className={style.mapContainer}>
        <RaisedButton label="Take me here!" onClick={this.props.onSelectZipcode}/>
        <RaisedButton label="Go home" onClick={ this.props.goHome} />
          <Map
            google={this.props.google}
            center={
              this.props.xy
            }
            gestureHandling={"cooperative"}
            disableDefaultUI={true}
            zoomControl={true}
            mapTypeControl={true}
            scaleControl={true}
            streetViewControl={true}
            panControl={true}
            scrollWheel={true}
            zoom={15}
            style={mapStyle}
            onDragend={this.props.onMarkerPositionChanged}
            > 
            {this.props.markers.map((marker, idx) => {
                const lat = marker.coordinates.latitude;
                const lng = marker.coordinates.longitude;
                const name = marker.name;
                return (<Marker 
                  onClick={this.onMarkerHover} 
                  key={idx} info={marker} 
                  position={{lat, lng}}
                />)
              })}
    {this.props.zips.map((zip, idx) => {
                var zip = zipcodes.lookup(zip)
                var code = zip.zip
                var lat = zip.latitude
                var lng =  zip.longitude
                console.log('code', code)
 
                if (this.props.google !== undefined && this.props.usersToggled === true){
                return (<Marker 
                  icon={{url:"https://cdn0.iconfinder.com/data/icons/gray-business-toolbar/512/affiliate-3-512.png",
                         anchor: new google.maps.Point(16,16),
                         scaledSize: new google.maps.Size(32,32)}}
                  onClick={this.onClick}
                  key={idx} info={code} 
                  position={{lat, lng}}
                />)
              }
              })}  

            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
              <div>
                  <h3> {this.state.info.name} </h3>
                <a href={this.state.info.url}> Yelp </a>
                <img style={{height: '40px', width: '40px'}} src={this.state.info.image_url}/>
              </div>
            </InfoWindow>
            <InfoWindow marker={this.state.activeZip} visible={this.state.showingZipUsers}>
              <div>{this.state.users.map((user, idx)=> <ZipUser name={user.name} img={user.image_url} key={idx}/>)}
              </div>
            </InfoWindow>
          </Map>
        </span>
      )
  }
}

export default GoogleApiWrapper({
  apiKey: (keys.GoogleMap_TOKEN)
})(MapContainer)

