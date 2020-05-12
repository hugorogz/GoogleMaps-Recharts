import React from 'react'
import GoogleMap from './GoogleMap'
import StackedChart from './StackedChart'

class MapContainer extends React.Component {
    constructor(props) {
        super(props)
        // state used to keep track of the selected samples from map and the selected country
        this.state = {
            selectedSamples: [],
            selectedCountry: ""
        }
        // callback function to read the selections from GoogleMap
        this.handleSelectedSamples = this.handleSelectedSamples.bind(this)
    }

    handleSelectedSamples(countrySamples, country) {

        // if there are samples, set them in state
        this.setState({ 
            selectedSamples: countrySamples,
            selectedCountry: country.toUpperCase()
        }, () => {
            if(countrySamples.length === 0){
                // if no samples (there are countries with no samples), 
                // open an alert that encourages to select another country
                alert("No samples available. Please click on another country")
            }
        })
    }

    render() {
        const { selectedSamples, selectedCountry } = this.state
        const { samples } = this.props
        return (
            <div>
                <h2 style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    flexDirection: "column",
                    margin: 25 
                }}>UI Assignment</h2>

                {/* Map */}
                <GoogleMap samples={samples} handleSelectedSamples={this.handleSelectedSamples} />
                
                {/* if no samples, show a message, otherwise, show chart with selected samples and country  */}
                {selectedSamples.length > 0
                ? <StackedChart countrySamples={selectedSamples} selectedCountry={selectedCountry} />
                : null}
            </div>
        )
    }
}

export default MapContainer