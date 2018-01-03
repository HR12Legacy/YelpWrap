import React from 'react';
import GoogleApiWrapper from './MyMapComponent';

export default class App extends React.Component {
  constructor(props) {
    super(props);

  }


  onMarkerPositionChanged(mapProps, map) {
    console.log('mapProps', mapProps);
    console.log('lat', map.center.lat());
    console.log('lng', map.center.lng());
  };

  render() {
    return (
      <div>
        <GoogleApiWrapper  onMarkerPositionChanged={this. onMarkerPositionChanged.bind(this)}/>
      </div>
    )
  }
}