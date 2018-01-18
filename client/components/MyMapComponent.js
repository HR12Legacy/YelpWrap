import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
const CaretUp = require("react-icons/lib/fa/caret-up");
import keys from '../../config';
import style from './container.css';
import star from 'material-ui/svg-icons/toggle/star';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
const axios = require('axios')


class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      info:{},
      loc: ''
    }
    this.onMarkerHover = this.onMarkerHover.bind(this);
  }
  onMarkerHover(props, marker, event) {
    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      info: props.info
    })
  }

  onClick(props, marker, event){
    axios.get('user/' + props.info)
    .then(function(data){
      console.log(data)
      data.data
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
                onMouseover={this.onMarkerHover} 
                key={idx} info={marker} 
                position={{lat, lng}}
              />)
            })}
            {/*this.props.zips.map((zip, idx) => {
                var lat, lng, name
                var geocoder = new google.maps.Geocoder()
                geocoder.geocode({address: zip},
                  function(results_array, status) { 
                    lat = results_array[0].geometry.location.lat()
                    lng = results_array[0].geometry.location.lng()
                  })
              return (<Marker 
                icon={{url:"https://cdn0.iconfinder.com/data/icons/gray-business-toolbar/512/affiliate-3-512.png",
                       anchor: new google.maps.Point(16,16),
                       scaledSize: new google.maps.Size(32,32)}}
                onClick={this.onClick} 
                key={idx} info={zip} 
                position={{lat, lng}}
              />)
            })*/}
            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
              <div>
                <h3> {this.state.info.name} </h3>
                <a href={this.state.info.url}> Yelp </a>
                <img style={{height: '40px', width: '40px'}} src={this.state.info.image_url}/>
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

