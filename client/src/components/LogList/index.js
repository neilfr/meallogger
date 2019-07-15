import React from "react";
import "./style.css";
import { LogEntry } from "../LogEntry";
import Moment from "moment";

export function LogList(props) {
  console.log("LogList props is:", props);
  console.log("consumptionLog length is:", props.consumptionLog.length);
  if (!props.consumptionLog.length) {
    return (
      <div>
        {" "}
        <button
          onClick={() => {
            props.addConsumptionLogEntry();
          }}
        >
          New Log Entry
        </button>
      </div>
    );
  } else {
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
              setCurrentLogEntry={() => {
                props.setCurrentLogEntry(logEntry.consumptionLogId);
              }}
              deleteConsumptionLogEntry={() => {
                props.deleteConsumptionLogEntry(logEntry.consumptionLogId);
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
}
