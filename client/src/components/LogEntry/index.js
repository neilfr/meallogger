import React from "react";
import "./style.css";
import { DeleteBtn } from "../DeleteBtn";

export function LogEntry(props) {
  console.log("props is:", props);
  return (
    <div className="row">
      {/* <li className="list-group-item col-10" onClick={props.setLogEntryClick}> */}
      <li
        className="list-group-item col-10"
        onClick={props.setCurrentLogEntryClick}
      >
        {props.logDate}
        <br />
        {props.foodDescription}
        <br />
        HelloQty:{props.quantity}
        <br />
        KCal:{props.calories}
      </li>
      <DeleteBtn onClick={props.setDeleteClick} className="col" />
    </div>
  );
}
