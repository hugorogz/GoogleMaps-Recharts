import React, { Component, createRef } from 'react'
import countriesDictionary from "../countriesDictionary.json"

const apiKey = "AIzaSyBabPVJ8EbrHK5a-pr3Htuw7AY4oseh6sw"

class GoogleMap extends Component {
  googleMapRef = React.createRef()

  componentDidMount() {
    const googleMapScript = document.createElement('script')

    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    window.document.body.appendChild(googleMapScript)

    googleMapScript.addEventListener('load', () => {
      this.googleMap = this.createGoogleMap()
      this.marker = this.createMarker()
    })
  }

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 4,
      center: {
        lat: 50,
        lng: -50,
      },
      disableDefaultUI: true,
    })

  createMarker = () => {
    var marker, country
    var infowindow = new window.google.maps.InfoWindow();

    for (country in countriesDictionary) {  
        marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(
              Number(countriesDictionary[country].lat), 
              Number(countriesDictionary[country].long)),
          map: this.googleMap
        });
  
        window.google.maps.event.addListener(marker, 'click', (function(marker, country) {
          return function() {
            infowindow.setContent(country);
            infowindow.open(this.googleMap, marker);
          }
        })(marker, country));
      }
  }
    

  render() {
    return (
      <div
        id="google-map"
        ref={this.googleMapRef}
        style={{ width: '900px', height: '500px' }}
      />
    )
  }
}

export default GoogleMap