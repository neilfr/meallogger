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
      Food Description: {props.logEntry.foodDescription}
      <br />
      Quantity (mg):
      <input
        name="quantity"
        type="number"
        defaultValue={props.logEntry.quantity}
        onChange={props.onChange}
      />
      <br />
      Calories: {(props.logEntry.calories * props.logEntry.quantity) / 100}
      <br />
      <button onClick={props.saveClick}>Save</button>
      <button onClick={props.cancelClick}>Cancel</button>
    </div>
  );
}
