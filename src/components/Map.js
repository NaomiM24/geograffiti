import React, { Component } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import * as manchesterData from "../data/manchester";
import mapStyle from "../data/mapStyle";

class GMap extends Component {
  state = {
    selectedPlace: null,
    setSelectedPlace: null,
    currentLatLng: {
      lat: 0,
      lng: 0,
    },
    isMarkerShown: false,
  };
  componentDidMount() {
    this.getGeoLocation();
    this.setState({ isMarkerShown: true });
    this.interval = setInterval(() => this.getGeoLocation(), 5000);
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          currentLatLng: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    }
  };
  render() {
    return (
      <GoogleMap
        defaultZoom={14}
        center={{
          lat: this.state.currentLatLng.lat,
          lng: this.state.currentLatLng.lng,
        }}
        defaultOptions={{
          styles: mapStyle,
          mapTypeControl: false,
          streetViewControl: false,
        }}
      >
        {manchesterData.default.data.map(place => (
          <Marker
            key={place.id}
            position={{
              lat: place.location.latitude,
              lng: place.location.longitude,
            }}
            onClick={() => {
              this.setState({ selectedPlace: place });
            }}
            icon={{
              url: "/spray-can.png",
              scaledSize: new window.google.maps.Size(25, 25),
            }}
          />
        ))}
        {this.state.isMarkerShown && (
          <Marker
            position={{
              lat: this.state.currentLatLng.lat,
              lng: this.state.currentLatLng.lng,
            }}
            icon={{
              url: "/user-location.png",
              scaledSize: new window.google.maps.Size(25, 25),
            }}
          />
        )}
        {this.state.selectedPlace && (
          <InfoWindow
            position={{
              lat: this.state.selectedPlace.location.latitude,
              lng: this.state.selectedPlace.location.longitude,
            }}
            onCloseClick={() => {
              this.setState({ setSelectedPlace: null });
            }}
          >
            <div>
              <p className="marker-user">{this.state.selectedPlace.user}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }
}

const WrappedMap = withScriptjs(withGoogleMap(GMap));

export default function Map() {
  return (
    <div style={{ width: "100vw", height: "100vh" }} className="map">
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: "75%", marginTop: "25%" }} />}
        containerElement={<div style={{ height: "75%", width: "100%" }} />}
        mapElement={<div style={{ height: "100%", width: "100%" }} />}
      />
    </div>
  );
}
// var R = 6371e3; // metres
// var φ1 = lat1.toRadians();
// var φ2 = lat2.toRadians();
// var Δφ = (lat2-lat1).toRadians();
// var Δλ = (lon2-lon1).toRadians();

// var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
//         Math.cos(φ1) * Math.cos(φ2) *
//         Math.sin(Δλ/2) * Math.sin(Δλ/2);
// var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

// var d = R * c;
