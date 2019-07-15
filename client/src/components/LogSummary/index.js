import React from "react";
import "./style.css";

export function LogSummary(props) {
  // console.log("props.foo is:", props.foo);
  return (
    <div className="row">
      <div>
        Total Calories:
        {props.consumptionLog.reduce((total, logEntry) => {
          return total + (logEntry.calories * logEntry.quantity) / 100;
        }, 0)}
      </div>
    </div>
  );
}
