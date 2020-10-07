import React from "react";
import axios from "axios";

export default function Mover() {
  const [runningTrainsList, setRunningTrainsList] = React.useState();
  const [stopsList, setStopsList] = React.useState();
  const [stopsFiltered, setStopsFiltered] = React.useState();
  const [trainUpdate, setTrainUpdate] = React.useState(false);

  // Fetch all the train not in Maintenance

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/trains/running")
      .then(function (response) {
        const arrayList = response.data;
        setRunningTrainsList(arrayList);
        setTrainUpdate(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [trainUpdate]);

  // Fetch the stops

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/stops/")
      .then(function (response) {
        console.log(response);
        const stopsListRaw = response.data;
        const filteredStops = [...new Set(stopsListRaw.map((data) => data.city))];
        setStopsFiltered(filteredStops);
        setStopsList(stopsListRaw);
        console.log(stopsListRaw);
        setTrainUpdate(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [trainUpdate]);

  const getSelectValue = (e, train) => {
    const id = train.id;
    let city = e.target.value;
    let newStopId = 0;
    if (city === "Frankfurt") newStopId = 3;
    else if (city === "Berlin") newStopId = 2;
    else if (city === "München") newStopId = 5;
    else if (city === "Stuttgart") newStopId = 4;
    else if (city === "Hamburg") newStopId = 1;
    else if (city === "Düsseldorf") newStopId = 6;

    axios
      .put("http://localhost:5000/trains/sendtostation/" + id, { stopid: newStopId })
      .then((data) => {
        setTrainUpdate(true);
        console.log(data);
      })
      .catch((error) => console.log(error));
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
          {runningTrainsList
            ? runningTrainsList.map((element, index) => (
                <tr key={index}>
                  <td>{element.id}</td>
                  <td>{element.name}</td>
                  <td>{element.length}</td>
                  <td className="empty">{element.stopid}</td>
                  <td>
                    {/* Dropdown running trains */}
                    <div>
                      <label for="cars">Choose a stop:</label>
                      <select name="stops" id="stops" onChange={(e) => getSelectValue(e, element)}>
                        <option disabled selected value>
                          -- Where do you want to send your train? --
                        </option>
                        {stopsList && stopsList.length
                          ? stopsFiltered.map((element, index) => (
                              <option getId={element.stopid} key={index}>
                                {element}
                              </option>
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
