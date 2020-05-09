import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'; // used recharts library for chart
  
export default class Example extends PureComponent {  
    render() {
        // destructure countrySamples selected and country from props
        const { countrySamples, selectedCountry } = this.props
        // use of arr.reduce() to create a new list only containing the
        // necessary information to be displayed on the chart based on requirements
        // Y-axis, "Perc_lt_30ms", X-Axis, "Date"
        const sourceData = countrySamples.reduce((acc, elem) => {
            const { _source } = elem
            const { Country, Date, Perc_lt_30ms } = _source

            acc.push({ 
                Country, 
                Date, 
                Perc_lt_30ms
            })

            return acc
        }, [])

        // we return a div with our chart 
        return (
            <div style={{ 
                display: "flex", 
                alignItems: "center", 
                flexDirection: "column" 
            }}>
                <h3 style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    flexDirection: "column",
                    margin: 20,
                    color: "green" 
                }}>
                    {/* pass selected country */}
                    Country: {selectedCountry}
                </h3>

                <BarChart
                    width={800}
                    height={300}
                    data={sourceData}// pass the data list we created up here with array.reduce
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    {/* give datakey of Date to XAxis to detect Dates from sourceData */}
                    <XAxis dataKey="Date" /> 
                    {/* give datakey of Date to YAxis to detect Perc_lt_30ms from sourceData */}
                    <YAxis dataKey="Perc_lt_30ms" />
                    {/* tooltip that shows the data when hover over bars in chart */}
                    <Tooltip />
                    {/* Legend that appears at the botom center of the chart  */}
                    <Legend align="center" height={36} />
                    {/* bars that are going to be shown in the chart */}
                    <Bar dataKey="Perc_lt_30ms" stackId="a" fill="#8884d8" />
                </BarChart>
            </div>
        );
    }
  }
  