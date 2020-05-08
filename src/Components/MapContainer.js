import React from 'react'
import GoogleMap from './GoogleMap'

class MapContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedSamples: []
        }
        
        this.handleSelectedSamples = this.handleSelectedSamples.bind(this)
    }

    handleSelectedSamples(countrySamples) {
        this.setState({ selectedSamples: countrySamples})
    }

    render() {
        console.log(this.state.selectedSamples)
        return (
            <GoogleMap samples={this.props.samples} handleSelectedSamples={this.handleSelectedSamples} />
        )
    }
}

export default MapContainer