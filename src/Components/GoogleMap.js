import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server';
import countriesDictionary from "../countriesDictionary.json"

const apiKey = "AIzaSyBabPVJ8EbrHK5a-pr3Htuw7AY4oseh6sw"

class GoogleMap extends Component {
  // create a React ref to be able to modify map
  // out of the main data flow
  googleMapRef = React.createRef()

  componentDidMount() {
    // after mount map component, create a script tag
    // for append the mapScript and pass the apiKey(we need it for use google maps api)
    const googleMapScript = document.createElement('script')

    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`

    // apend script tag to the dom
    window.document.body.appendChild(googleMapScript)

    // listen for load event of the google map script,
    // on load, create the Map with this.createGoogleMap
    // also we create our markers, with all information needed inside its
    // infoWindow component (see createMarker)
    googleMapScript.addEventListener('load', () => {
      this.googleMap = this.createGoogleMap()
      this.marker = this.createMarker()
    })
  }

  createGoogleMap = () =>
    // by using the ref we created, we set the initial configurration of the map
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 2,
      center: {
        lat: -1.3988, lng: 38.9233
      },
      disableDefaultUI: true,
    })

  createMarker = () => {
    var marker, country
    // we create our infoWindow comp for map
    var infowindow = new window.google.maps.InfoWindow();
    // we destructure samples pased from dataSet.json and also handleSelectedSamples callback
    // from MapContainer
    const { samples, handleSelectedSamples } = this.props

    // also we iterate over our countries dictionary (get lat and long of each contry from its Country Code)
    // resource: https://gist.github.com/sindresorhus/1341699
    for (country in countriesDictionary) {
        // for each country in countriesDictionary, we create a marker
        // with its lat and lng and append it to out map
        marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(
              Number(countriesDictionary[country].lat),
              Number(countriesDictionary[country].long)),
          map: this.googleMap,
          label: country.toUpperCase() // label to show country code in marker
        });

        // add an event listener for click on marker
        window.google.maps.event.addListener(marker, 'click', (function(marker, country) {
          return function() {
            const countrySamples = samples.filter(sample => sample._source.Country === country.toUpperCase())
            
            // callback for selectSamples and country we are going to use for Chart
            handleSelectedSamples(countrySamples, country) 

            // create a Div that contains all the samples for a country with
            // the data wee need to display in InfoWindow
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

            // used ReactDOMServer from react-dom to 'convert' our
            // renderDiv to string to be able to pass if to infowindow.setContent(), 
            // called component tooltip, to make more sense
            // this component is scrollable
            const tooltip = ReactDOMServer.renderToString(renderDiv);

            infowindow.setOptions({ disableAutoPan: true })// option to disable movement of map on hover/select infowindow
            infowindow.setContent(tooltip);// set our tooltip in the infowindow content
            infowindow.open(this.googleMap, marker);// open infowindow of the passed marker in map
          }
        })(marker, country));

        // add an event listener for mouseover on marker
        // this does not contain the callback for select the samples and country for charts
        // since we only whant to select only on click; on mouse over we are not selecting that data,
        // not selecting int
        window.google.maps.event.addListener(marker, 'mouseover', (function(marker, country) {

          return function() {
            const countrySamples = samples.filter(sample => sample._source.Country === country.toUpperCase())

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
            // used ReactDOMServer from react-dom to 'convert' our
            // renderDiv to string to be able to pass if to infowindow.setContent(), 
            // called component tooltip, to make more sense
            // this component is scrollable
            const tooltip = ReactDOMServer.renderToString(renderDiv);

            infowindow.setOptions({ disableAutoPan: true })// option to disable movement of map on hover/select infowindow
            infowindow.setContent(tooltip);// set our tooltip in the infowindow content
            infowindow.open(this.googleMap, marker);// open infowindow of the passed marker in map
          }


        })(marker, country));
      }
  }

  render() {
    return (
      // div that contains Map
      <div
        id="google-map"
        ref={this.googleMapRef}
        style={{ width: '800px', height: '300px',display: "flex", margin: "auto", flexDirection: "column" }}
      />
    )
  }
}

export default GoogleMap