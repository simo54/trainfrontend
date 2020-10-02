import React from "react";
import axios from "axios";
import "../Styles/ListofTrains.css";

export default function ListofTrains() {
  const [trainsList, setTrainsList] = React.useState();

  React.useEffect(() => {
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

  const showStation = () => {
    // const element = document.getElementsByClassName("stopidTable").class;
  };

  return (
    <div className='mainContainer'>
      <h1>Trains List</h1>
      <button onClick={showStation}>Where is my train?</button>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>city</th>
            <th>Length</th>
            <th className='stopidTable'>Stop</th>
          </tr>
        </thead>
        <tbody>
          {trainsList
            ? trainsList.map((element, index) => (
                <tr key={index}>
                  <td>{element.id}</td>
                  <td>{element.name}</td>
                  <td>{element.length}</td>
                  <td className='stopidTable'>{element.stopid}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
