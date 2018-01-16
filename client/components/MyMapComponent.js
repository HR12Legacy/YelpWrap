import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
const CaretUp = require("react-icons/lib/fa/caret-up");
import keys from '../../config';
import style from './container.css';
import star from 'material-ui/svg-icons/toggle/star';

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
  
  render() {
      const mapStyle = {
        'height': '100%',
        'overflow': 'hidden',
        'paddingBottom': '22.25%',
        'paddingTop': '30px',
        'position': 'relative',
      }

      return (
        <div className={style.mapContainer}>
          <Map
            google={this.props.google}
            center={
              this.props.xy
            }
            gestureHandling={"cooperative"}
            disableDefaultUI={true}
            zoom={10}
            style={mapStyle}
            onDragend={
              this.props.onMarkerPositionChanged
            }>
            {this.props.markers.map((marker, idx) => {
              const lat = marker.coordinates.latitude;
              const lng = marker.coordinates.longitude;
              const name = marker.name;
              return (<Marker 
                icon={this.props.faves.indexOf(name) > -1 ? { url:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Star_empty_font_awesome.svg/2000px-Star_empty_font_awesome.svg.png',
                       anchor: new google.maps.Point(8,8),
                       scaledSize: new google.maps.Size(16,16)} : undefined}
                onMouseover={this.onMarkerHover} 
                key={idx} info={marker} 
                position={{lat, lng}}
              />)
            })}
            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
              <div>
                <h3> {this.state.info.name} </h3>
                <a href={this.state.info.url}> Yelp </a>
                <img style={{height: '40px', width: '40px'}} src={this.state.info.image_url}/>
              </div>
            </InfoWindow>
          </Map>
        </div>
      )
  }
}

export default GoogleApiWrapper({
  apiKey: (keys.GoogleMap_TOKEN)
})(MapContainer)
