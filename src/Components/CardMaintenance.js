import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "../Styles/CardMaintenance.css";

const CardMaintenance = (props) => {
  const { id, name, length, stop, maintenance, handleMaintenance } = props;

  // adding dynamically class for changing color
  const maintenanceClass = `maintenance + ${maintenance ? "true" : "false"} `;

  return (
    <div className={maintenanceClass}>
      <div className="row mTrainId">{id}</div>
      <div className="row mTrainName">{name}</div>
      <div className="row mTrainLength">{length}</div>
      <div className="row mTrainStop">{stop}</div>
      <div>
        {maintenance === false ? (
          <div>
            <button className="mButton add" onClick={handleMaintenance}>
              Add
            </button>
            <FontAwesomeIcon className="icon" icon={faTools} />
          </div>
        ) : (
          <div>
            <button className="mButton remove" onClick={handleMaintenance}>
              Remove
            </button>
            <FontAwesomeIcon className="icon" icon={faCheckCircle} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardMaintenance;
