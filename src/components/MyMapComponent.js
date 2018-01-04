import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
const CaretUp = require("react-icons/lib/fa/caret-up");
import keys from '../../config';
import style from './container.css';



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
      return (
        <div style={{height:'45vh', display: 'block', position: 'absolute', position: '-webkit-sticky',
        position: 'sticky'}}>
          <Map
            google={window.google}
            center={
              this.props.xy
            }
            zoom={14}
            onDragend={
              this.props.onMarkerPositionChanged
            }>
          
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
