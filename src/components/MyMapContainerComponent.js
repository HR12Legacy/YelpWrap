import React from 'react';
import MyMapComponent from './MyMapComponent';
/**
 * dependencies:
 *  "googlemaps": "^1.12.0",
    "markerclustererplus": "^2.1.4",
    "react": "^16.2.0",
    "react-bootstrap": "^0.31.5",
    "react-dom": "^16.2.0",
    "react-google-maps": "^9.4.3",
    "react-icons": "^2.2.7",
 */

class MyMapContainerComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isMarkerShown: false
    }
  }

  delayedShowMarker(){
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 1000);
  }

  render() { 
    return (
      <MyMapComponent
        currentMovie={this.props.currentMovie}
        delayedShowMarker={this.delayedShowMarker.bind(this)}
        defaultCenter={this.props.defaultCenter}
        markersWithInfo={this.props.markersWithInfo}
        isMarkerShown={this.state.isMarkerShown}
      />
    )
  }
}

export default MyMapContainerComponent;