import React from 'react';
import MyMapComponent from './MyMapComponent';

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