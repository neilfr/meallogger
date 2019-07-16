import React from "react";
import "./style.css";
import { DeleteBtn } from "../DeleteBtn";

export function LogEntry(props) {
  console.log("Log Entry props are:", props);
  return (
    <div className="row">
      <li className="list-group-item col-10" onClick={props.setCurrentLogEntry}>
        {props.logDate}
        <br />
        {props.foodDescription}
        <br />
        Qty:{props.quantity}
        <br />
        KCal:{props.calories}
      </li>
      <DeleteBtn onClick={props.deleteConsumptionLogEntry} className="col" />
    </div>
  );
}
