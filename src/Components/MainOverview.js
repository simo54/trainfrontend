import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/MainOverview.css";

export default function ListofTrains() {
  const [trainsList, setTrainsList] = useState();
  const [stopsList, setStopsList] = useState();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    axios
      .get("trains/")
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
      .get("stops/")
      .then(function (response) {
        const arrayList = response.data;
        setStopsList(arrayList);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // Creating a toggle in order to display or not the stops
  const showStation = () => {
    setToggle(true);
  };

  return (
    <div className='mainContainer'>
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
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>city</th>
            <th>train</th>
          </tr>
        </thead>
        <tbody>
          {stopsList
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
