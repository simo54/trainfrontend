import React from "react";
import axios from "axios";

export default function ListofTrains() {
  const [stopsList, setStopsList] = React.useState();

  React.useEffect(() => {
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

  return (
    <div className='mainContainer'>
      <h1>Stops List</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>city</th>
          </tr>
        </thead>
        <tbody>
          {stopsList
            ? stopsList.map((element, index) => (
                <tr key={index}>
                  <td>{element.id}</td>
                  <td>{element.city}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
