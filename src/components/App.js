import React from 'react';
import { MyMapContainerComponent as MapContainer } from './MyMapContainerComponent';

export default class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <h1> Hello World </h1>
        <MapContainer/>
      </div>
    )
  }
}