import React from "react";
import axios from "axios";

export default function Mover() {
  const [RunningtrainsList, setRunningTrainsList] = React.useState();
  const [stopsList, setStopsList] = React.useState();
  const [stopsFiltered, setStopsFiltered] = React.useState();

  // Fetch all the train not in Maintenance

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/trains/running")
      .then(function (response) {
        const arrayList = response.data;
        setRunningTrainsList(arrayList);
        console.log(arrayList);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // Fetch the stops

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/stops/")
      .then(function (response) {
        const stopsListRaw = response.data;
        const filteredStops = [
          ...new Set(stopsListRaw.map((data) => data.city)),
        ];
        setStopsFiltered(filteredStops);
        setStopsList(stopsListRaw);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const getSelectValue = (e) => {
    const uniqueValues = stopsList.map(function (data) {
      return data.city === e.target.value;
    });
    console.log(uniqueValues);
  };

  // display the Running Trains
  return (
    <div className="RunningTrainContainer">
      <h2>Running Trains List</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>city</th>
            <th>Length</th>
            <th className="empty">Stop</th>
          </tr>
        </thead>
        <tbody>
          {RunningtrainsList
            ? RunningtrainsList.map((element, index) => (
                <tr key={index}>
                  <td>{element.id}</td>
                  <td>{element.name}</td>
                  <td>{element.length}</td>
                  <td className="empty">{element.stopid}</td>
                  <td>
                    {/* Dropdown running trains */}
                    <div>
                      <label for="cars">Choose a stop:</label>
                      <select name="stops" id="stops" onChange={getSelectValue}>
                        <option disabled selected value>
                          -- Where do you want to send your train? --
                        </option>
                        {stopsList
                          ? stopsFiltered.map((element, index) => (
                              <option key={index}>{element}</option>
                            ))
                          : null}
                      </select>
                    </div>
                    {/* End of Dropdown running trains*/}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
