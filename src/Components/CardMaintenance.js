import React from "react";
import "../Styles/CardMaintenance.css";

const CardMaintenance = (props) => {
  const { id, name, length, stop, maintenance, handleMaintenance } = props;
  const maintenanceClass = `maintenance + ${maintenance ? "true" : "false"} `;
  return (
    <div className={maintenanceClass}>
      <div className="row mTrainId">{id}</div>
      <div className="row mTrainName">{name}</div>
      <div className="row mTrainLength">{length}</div>
      <div className="row mTrainStop">{stop}</div>
      <div>
        {maintenance === false ? (
          <button className="mButton" onClick={handleMaintenance}>
            Add
          </button>
        ) : (
          <button className="mButton" onClick={handleMaintenance}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default CardMaintenance;
