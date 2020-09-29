import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../Styles/Maintenance.css";

const Maintenance = () => {
  /*  const urlTrains = "http//localhost5000/trains";
  const [maintenanceData, setMaintenanceData] = useEffect("");

  const getMaintenance = async () => {
    try {
      const { data } = await Axios.get(urlTrains);
      setMaintenanceData(data);
    } catch (error) {
      console.log(error);
    }
  }; */
  return (
    <div className="MWrapper">
      <div>Trains</div>
      <button>Repair</button>
    </div>
  );
};

export default Maintenance;
