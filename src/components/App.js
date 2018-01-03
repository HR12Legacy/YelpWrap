import React from 'react';
import GoogleApiWrapper from './MyMapComponent';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    }
  }

  getPosition(options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  componentDidMount() {
    const currentState = this.state;
    this.getPosition()
    .then(result => {
      currentState.location.latitude: result.coords.latitude,
      currentState.location.longitude: result.coords.longitude,
      this.setState({ currentState });
    })
    .catch(err => console.error(err));
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