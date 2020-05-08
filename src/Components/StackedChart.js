import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
  
export default class Example extends PureComponent {  
    render() {
        const { countrySamples } = this.props
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

        console.log(sourceData)
        return (sourceData.length 
            ? <div style={{ 
                display: "flex", 
                alignItems: "center", 
                flexDirection: "column" 
            }}>
                <BarChart
                    width={800}
                    height={500}
                    data={sourceData}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis dataKey="Perc_lt_30ms" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Perc_lt_30ms" stackId="a" fill="#8884d8" />
                </BarChart>
            </div>
            : <h2 style={{ 
                display: "flex", 
                alignItems: "center", 
                flexDirection: "column",
                margin: 100 
            }}>No samples available</h2>
        );
    }
  }
  