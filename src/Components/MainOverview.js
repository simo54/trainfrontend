import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/MainOverview.css";

export default function ListofTrains() {
  const [trainsList, setTrainsList] = useState();
  const [stopsList, setStopsList] = useState();
  const [toggle, setToggle] = useState(false); // Toggle for display current stops of the trains
  const [stopsFiltered, setStopsFiltered] = useState();
  const [mapDropSelection, setMapDropSelection] = useState();

  // Getting the trains from the endpoint
  useEffect(() => {
    axios
      .get("http://localhost:5000/trains/")
      .then(function (response) {
        const arrayList = response.data;
        setTrainsList(arrayList);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // Getting the stops from the endpoint
  useEffect(() => {
    axios
      .get("http://localhost:5000/stops/")
      .then(function (response) {
        const stopsListRaw = response.data;
        // Filtered list of city stops, this will be used for the dropdown menu
        const filteredStops = [...new Set(stopsListRaw.map((data) => data.city))];
        console.log(filteredStops);
        console.log(stopsListRaw);
        setStopsFiltered(filteredStops);
        setStopsList(stopsListRaw);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // Creating a toggle in order to display the stops
  const showStation = () => {
    setToggle(true);
  };

  // Using the getSelectValue we will get only the stop with the all available trains, if we want to see them all we can select showAll
  const getSelectValue = (e) => {
    const uniqueValues = stopsList.filter(function (data) {
      // We create a variable that will filter the existing stopsList
      if (e.target.value === "showAll") {
        // If showAll is selected, we will show all cities
        return data.city;
      } else {
        // Otherwise, if a city has been chosen we will show only the trains on that stop
        return data.city === e.target.value;
      }
    });
    setMapDropSelection(uniqueValues);
  };

  return (
    <div className='mainContainer'>
      <h1>Trains List</h1>

      {/* Button to show station column */}
      <button onClick={showStation}>Where are the trains now?</button>

      <div className='trainTable-Container'>
        <table id='trainTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>city</th>
              <th>Length</th>
              {/* If button is clicked, we will show the additional column thanks to css in MainOverview.css */}
              <th className={toggle === true ? "" : "stopidTable"}>Stop</th>
            </tr>
          </thead>
          <tbody>
            {/* Checking the existing of trainList data, if yes we map the results */}
            {trainsList && trainsList.length
              ? trainsList.map((element, index) => {
                  return element.id !== null ? (
                    <tr key={index}>
                      <td>{element.id}</td>
                      <td>{element.name}</td>
                      <td>{element.length}</td>
                      <td className={toggle === true ? "" : "stopidTable"}>{element.city}</td>
                    </tr>
                  ) : null;
                })
              : null}
          </tbody>
        </table>
      </div>

      <h1>Stops List</h1>
      {/* Dropdown */}
      <div className='stopsTable-Container'>
        <div id='dropdownStops'>
          <label for='cars'>Choose a stop:</label>

          {/* OnChange will get the value of a city */}
          <select name='stops' id='stops' onChange={getSelectValue}>
            {/* Basic option on every refresh */}
            <option disabled selected value>
              -- select an option --
            </option>
            {/* Checking the existing of stopsList data, if yes we map the results taken from the filter of stopslist */}
            {stopsList && stopsList.length ? stopsFiltered.map((element, index) => <option key={index}>{element}</option>) : null}
            <option>showAll</option>
          </select>
        </div>
        {/* End of Dropdown */}

        {mapDropSelection && mapDropSelection.length}
        <table id='stopsTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>city</th>
              <th>train</th>
            </tr>
          </thead>
          <tbody>
            {/* Checking the existing of mapDropSelection data (only cities), if yes we map only the data of a selected city */}
            {mapDropSelection && mapDropSelection.length
              ? mapDropSelection.map((element, index) => (
                  <tr key={index}>
                    <td>{element.id}</td>
                    <td>{element.city}</td>
                    <td>{element.name}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
