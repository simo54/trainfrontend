import React, { useEffect, useState } from "react";
import Axios from "axios";
import CardMaintenance from "./CardMaintenance";
import "../Styles/Maintenance.css";

const Maintenance = () => {
  const urlTrains = "http://localhost:5000/trains/";
  const [maintenanceData, setMaintenanceData] = useState({});
  const [inMaintenance, setInMaintenance] = useState(false);
  const [trainUpdate, setTrainUpdate] = useState(false);

  useEffect(() => {
    getMaintenance();
  }, [trainUpdate]);

  // Fetch all data for all the trains
  const getMaintenance = async () => {
    try {
      const { data } = await Axios.get(urlTrains);
      setMaintenanceData(data);
      setTrainUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Change maintenance status via onClick-Event from false to true and vice  verse
  // Update maintenance status in database with the new value
  const changeMaintenance = async (train) => {
    train.maintenance === false ? setInMaintenance(true) : setInMaintenance(false);
    try {
      await Axios.put(urlTrains + train.id, { maintenance: inMaintenance });
      setTrainUpdate(true);
      console.log(train.maintenance);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="MWrapper">
      <h1>Maintenance status</h1>
      <div>
        <div className="tHead">
          <div className="mId">Id</div>
          <div className="mName">Name</div>
          <div className="mLength">Length</div>
          <div className="mStop">Current stop</div>
          <div className="mMaintenance">Maintenance</div>
        </div>
        {maintenanceData && maintenanceData.length
          ? maintenanceData.map((train) => {
              return (
                <CardMaintenance
                  key={train.id}
                  id={train.id}
                  name={train.name}
                  length={train.length}
                  stop={train.stopid}
                  maintenance={train.maintenance}
                  handleMaintenance={() => changeMaintenance(train)}
                />
              );
            })
          : undefined}
      </div>
    </div>
  );
};

export default Maintenance;
