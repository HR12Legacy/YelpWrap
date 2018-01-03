import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
const CaretUp = require("react-icons/lib/fa/caret-up");
import keys from '../../config';
 
class MapContainer extends React.Component {

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
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (keys.GoogleMap_TOKEN)
})(MapContainer)



