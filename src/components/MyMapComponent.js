import React from 'react';
import { compose, withProps, withStateHandlers, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, DirectionsRenderer } from "react-google-maps";
const CaretUp = require("react-icons/lib/fa/caret-up");
// import keys from '../../config';
// import keys from '../credentials';  || keys.GOOGLE_API <--- PRODUCTION
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



const MyMapComponent = compose(
  withStateHandlers(() => ({
    isOpen: false,
    index: null,
    isClicked: false
  }), {
    onToggleOpen: ({ isOpen, index }) => (clickedIndex) => ({
      isOpen: !isOpen,
      index: clickedIndex
    }),
    onDirections: ({ directions, isClicked }) => (results) => ({
      directions: results,
      isClicked: !isClicked
    })
  }),
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API || keys.GOOGLE_API }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, width: `75%`, margin: `auto`}} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)((props) => {
  if(props.defaultCenter) {
    props.delayedShowMarker();
    return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={props.defaultCenter}
    >
      {
        props.isMarkerShown && props.markersWithInfo.map((markerWithInfo, index) => 
        <Marker 
        onMouseOver={() => {props.onToggleOpen(index)}}
        onClick={() => {
            ((start, end) => {
              const DirectionsService = new google.maps.DirectionsService();
                DirectionsService.route({
                  origin: new google.maps.LatLng(start),
                  destination: new google.maps.LatLng(end),
                  travelMode: google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                  if (status === google.maps.DirectionsStatus.OK) {
                    props.onDirections(result);
                  } else {
                    console.error(`error fetching directions ${result}`);
                  }
                })
            })(props.defaultCenter, markerWithInfo.location)
          }
        }
        icon={{url: "https://cdn3.iconfinder.com/data/icons/glypho-movie-and-video/64/film-camera-alt-512.png", scaledSize: new google.maps.Size(30, 30, 'pixel', 'pixel')}}
        key={index} 
        position={markerWithInfo.location}>
        {(props.isOpen && (props.index === index)) && <InfoWindow options={{content: `Title:${markerWithInfo.title}\nTime:${markerWithInfo.start_at}\nTheater:${markerWithInfo.theater}`}} onCloseClick={props.onToggleOpen}><CaretUp /></InfoWindow>}
        </Marker>)
      }
      {props.directions && props.isClicked && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
    )
  } else {
    return ( <div></div> )
  }
})

export default MyMapComponent;