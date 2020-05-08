import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server';
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
      zoom: 2,
      center: {
        lat: 50,
        lng: -50,
      },
      disableDefaultUI: true,
    })

  createMarker = () => {
    var marker, country
    var infowindow = new window.google.maps.InfoWindow();
    const { samples, handleSelectedSamples } = this.props

    for (country in countriesDictionary) {

        marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(
              Number(countriesDictionary[country].lat),
              Number(countriesDictionary[country].long)),
          map: this.googleMap,
          label: country.toUpperCase()
        });

        //listener click
        window.google.maps.event.addListener(marker, 'click', (function(marker, country) {
          return function() {
            const countrySamples = samples.filter(sample => sample._source.Country === country.toUpperCase())
            handleSelectedSamples(countrySamples)

            const renderDiv = <div>
              {
                countrySamples.length ? countrySamples.map(sample => {
                  const { _source, _id } = sample

                  return <div>
                    <h4>Country: {_source.Country}, Id: {_id}</h4>
                    <ul>
                      <li>TotalCount: {_source.TotalCount}</li>
                      <li>Date: {_source.Date}</li>
                      <li>Perc_lt_30ms: {_source.Perc_lt_30ms}</li>
                      <li>Perc_30ms_60ms: {_source.Perc_30ms_60ms}</li>
                      <li>Perc_60ms_90ms: {_source.Perc_60ms_90ms}</li>
                      <li>Perc_90ms_150ms: {_source.Perc_90ms_150ms}</li>
                      <li>Perc_gt_150ms: {_source.Perc_gt_150ms}</li>
                    </ul>
                  </div>
                }) : <div>No Samples Available</div>
              }
            </div>
            
            const tooltip = ReactDOMServer.renderToString(renderDiv);

            infowindow.setContent(tooltip);
            infowindow.open(this.googleMap, marker);
          }
        })(marker, country));

        // listener mouseover
        // window.google.maps.event.addListener(marker, 'mouseover', (function(marker, country) {

        //   return function() {
        //     const countrySamples = samples.filter(sample => sample._source.Country === country.toUpperCase())

        //     const renderDiv = <div>
        //       {
        //         countrySamples.length ? countrySamples.map(sample => {
        //           const { _source, _id } = sample

        //           return <div>
        //             <h4>Country: {_source.Country}, Id: {_id}</h4>
        //             <ul>
        //               <li>TotalCount: {_source.TotalCount}</li>
        //               <li>Date: {_source.Date}</li>
        //               <li>Perc_lt_30ms: {_source.Perc_lt_30ms}</li>
        //               <li>Perc_30ms_60ms: {_source.Perc_30ms_60ms}</li>
        //               <li>Perc_60ms_90ms: {_source.Perc_60ms_90ms}</li>
        //               <li>Perc_90ms_150ms: {_source.Perc_90ms_150ms}</li>
        //               <li>Perc_gt_150ms: {_source.Perc_gt_150ms}</li>
        //             </ul>
        //           </div>
        //         }) : <div>No Samples Available</div>
        //       }
        //     </div>
            
        //     const tooltip = ReactDOMServer.renderToString(renderDiv);

        //     infowindow.setContent(tooltip);
        //     infowindow.open(this.googleMap, marker);
        //   }
        // })(marker, country));
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