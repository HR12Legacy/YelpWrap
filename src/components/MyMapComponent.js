import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
const CaretUp = require("react-icons/lib/fa/caret-up");
import keys from '../../config';
const GOOGLE_API = keys.GOOGLE_API;
import style from './container.css';



class MapContainer extends React.Component {


render() {
    return (
      <div 
      className={style.container}
      >
        <Map
        google={this.props.google}
        mapCenter={this.props.mapCenter} 
        zoom={14}
        onDragend={
          this.props.onMarkerPositionChanged
        }
        >
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (GOOGLE_API)
})(MapContainer)



