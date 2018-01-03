import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
const CaretUp = require("react-icons/lib/fa/caret-up");
import keys from '../../config';
const GOOGLE_API = keys.GOOGLE_API;
// import keys from '../../config';  || keys.GOOGLE_API <--- PRODUCTION



class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
    }
    this.onMarkerHover = this.onMarkerHover.bind(this);
  }

  onMarkerHover(props, marker, event) {
    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
    })
  }

  render() {
      return (
        <Map
          google={this.props.google}
          mapCenter={this.props.mapCenter} 
          zoom={14}
          onDragend={
            this.props.onMarkerPositionChanged
          }
        >
          {this.props.markers.map((marker, idx) => {
            const lat = marker.coordinates.latitude;
            const lng = marker.coordinates.longitude;
            const name = marker.name;
            return <Marker onMouseover={this.onMarkerHover} key={idx} name={name} position={{lat, lng}}/>
          })}

          <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
            <div>
              <h1> Hello </h1>
            </div>
          </InfoWindow>

        </Map>
      );
  }
}

export default GoogleApiWrapper({
  apiKey: (GOOGLE_API)
})(MapContainer)



