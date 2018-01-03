import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
const CaretUp = require("react-icons/lib/fa/caret-up");
import keys from '../../config';
const GOOGLE_API = keys.GOOGLE_API;
// import keys from '../../config';  || keys.GOOGLE_API <--- PRODUCTION



class MapContainer extends React.Component {
render() {
    return (
      <Map google={this.props.google} zoom={14}>
{/* 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (GOOGLE_API)
})(MapContainer)



