import React from "react";

export function LogEntry(props) {
  console.log("props is:", props);
  return (
    <div>
      <br />
      Date:
      <input
        name="logDate"
        type="datetime-local"
        defaultValue={props.logEntry.logDate.slice(0, 16)}
        onChange={props.onChange}
      />
      <br />
      Food Code: {props.logEntry.foodCode}
      <br />
      Food Description: {props.logEntry.foodDescription}
      <br />
      Quantity (mg):
      <input
        name="quantity"
        type="number"
        defaultValue={props.logEntry.quantity}
      />
      <br />
      Calories: {props.logEntry.quantity}
      <br />
      <button>Close</button>
    </div>
  );
}
