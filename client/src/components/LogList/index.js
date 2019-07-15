import React from "react";
import "./style.css";
import { LogEntry } from "../LogEntry";
import Moment from "moment";

export function LogList(props) {
  console.log("LogList props is:", props);
  return (
    <div>
      <button
        onClick={() => {
          props.addConsumptionLogEntry();
        }}
      >
        New Log Entry
      </button>
      <div className="list-overflow-container">
        <ul className="list-group">{props.children}</ul>
        {props.consumptionLog.map(logEntry => (
          <LogEntry
            key={logEntry.consumptionLogId}
            setCurrentLogEntryClick={() => {
              props.setCurrentLogEntryClick(logEntry.consumptionLogId);
            }}
            setDeleteClick={() => {
              props.setDeleteClick(logEntry.consumptionLogId);
            }}
            logDate={Moment(logEntry.logDate).format("YYYY-MM-DD hh:mm a")}
            foodDescription={logEntry.foodDescription}
            quantity={logEntry.quantity}
            calories={(logEntry.calories * logEntry.quantity) / 100}
          />
        ))}
      </div>
    </div>
  );
}

// export function ListItem(props) {
//   console.log("props is:", props);
//   return <li className="list-group-item">tbd</li>;
// }
