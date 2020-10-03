import React from "react";
import axios from "axios";

export default function Mover() {
  const [RunningtrainsList, setRunningTrainsList] = React.useState();
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/trains/running")
      .then(function (response) {
        const arrayList = response.data;
        setRunningTrainsList(arrayList);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
