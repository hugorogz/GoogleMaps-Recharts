import React from 'react'
import GoogleMap from './GoogleMap'
import StackedChart from './StackedChart'

class MapContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedSamples: [],
            selectedCountry: ""
        }
        
        this.handleSelectedSamples = this.handleSelectedSamples.bind(this)
    }

    handleSelectedSamples(countrySamples, country) {
        if(!countrySamples.length){
            alert("No samples available. Please click on another country")
        }

        this.setState({ 
            selectedSamples: countrySamples,
            selectedCountry: country.toUpperCase()
        })
    }

    render() {
        const { selectedSamples, selectedCountry } = this.state
        const { samples } = this.props
        return (<>
            <GoogleMap samples={samples} handleSelectedSamples={this.handleSelectedSamples} />
            {selectedSamples.length 
            ? <StackedChart countrySamples={selectedSamples} selectedCountry={selectedCountry} />
            : <h2 style={{ 
                display: "flex", 
                alignItems: "center", 
                flexDirection: "column",
                margin: 100,
                color: "orange" 
            }}>Click on a Country Marker to get Samples</h2>}
        </>)
    }
}

export default MapContainer