import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/MainOverview.css";

export default function ListofTrains() {
  const [trainsList, setTrainsList] = useState();
  const [stopsList, setStopsList] = useState();
  const [toggle, setToggle] = useState(false);
  const [stopsFiltered, setStopsFiltered] = useState();

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

  useEffect(() => {
    axios
      .get("http://localhost:5000/stops/")
      .then(function (response) {
        const stopsListRaw = response.data;
        const filteredStops = [...new Set(stopsListRaw.map((data) => data.city))];
        setStopsFiltered(filteredStops);
        setStopsList(stopsListRaw);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [stopsFiltered]);

  // Creating a toggle in order to display or not the stops
  const showStation = () => {
    setToggle(true);
  };

  const getSelectValue = (e) => {
    const uniqueValues = stopsList.filter(function (data) {
      return data.city === e.target.value;
    });
    setStopsList(uniqueValues);
    console.log(uniqueValues);
  };

  return (
    <div className="mainContainer">
      <h1>Trains List</h1>
      <button onClick={showStation}>Where are these trains now?</button>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>city</th>
            <th>Length</th>
            <th className={toggle === true ? "" : "stopidTable"}>Stop</th>
          </tr>
        </thead>
        <tbody>
          {trainsList
            ? trainsList.map((element, index) => (
                <tr key={index}>
                  <td>{element.id}</td>
                  <td>{element.name}</td>
                  <td>{element.length}</td>
                  <td className={toggle === true ? "" : "stopidTable"}>{element.city}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      <h1>Stops List</h1>
      {/* Dropdown */}
      <div>
        <label for="cars">Choose a stop:</label>
        <select name="stops" id="stops" onChange={getSelectValue}>
          <option disabled selected value>
            -- select an option --
          </option>
          {stopsList ? stopsFiltered.map((element, index) => <option key={index}>{element}</option>) : null}
        </select>
      </div>
      {/* End of Dropdown */}

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>city</th>
            <th>train</th>
          </tr>
        </thead>
        <tbody>
          {stopsList && stopsList.length
            ? stopsList.map((element, index) => (
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
  );
}
