import React from 'react';
import { MyMapContainerComponent as MapContainer } from './MyMapContainerComponent';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((result, err) => {
      if(err) console.error(err);
      else {
        const state = this.state;
        state.location.longitude = result.coords.longitude;
        state.location.latitude = result.coords.latitude;
        this.setState({
          state
        })
      }
    })  
  }

  render() {
    return (
      <div>
        <h1> Hello World </h1>
      </div>
    )
  }
}