import React from 'react';
import GoogleApiWrapper from './MyMapComponent';

export default class App extends React.Component {
  constructor(props) {
    super(props);

  }

  onMarkerPositionChanged(center) {
    console.log('arg:', center);
  };
  //onMarkerPositionChanged={this.onMarkerPositionChanged.bind(this)}

  render() {
    return (
      <div>
        <GoogleApiWrapper />
      </div>
    )
  }
}