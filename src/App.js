import React from 'react';
import './App.css';
import Components from "./Components"
import dataSet from "./dataSet.json"

// gmaps api key AIzaSyBabPVJ8EbrHK5a-pr3Htuw7AY4oseh6sw

const { GoogleMap } = Components

function App() {
  const { hits } = dataSet.hits

  console.log(dataSet)
  return (
    <div className="App">
      <GoogleMap samples={hits} />
    </div>
  );
}

export default App;
