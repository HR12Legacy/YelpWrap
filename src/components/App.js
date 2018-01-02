import React from 'react';
import { MyMapContainerComponent as MapContainer } from './MyMapContainerComponent';

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

  render() {
    return (
      <div>
        <h1> Hello World </h1>
      </div>
    )
  }
}