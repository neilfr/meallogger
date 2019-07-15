import React from "react";

export function LogEntryForm(props) {
  console.log("props is:", props);
  if (!props.logEntry) {
    return <div>Select a log entry</div>;
  } else {
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
        <button onClick={props.updateConsumptionLogEntryFood}>
          Food Description: {props.logEntry.foodDescription}
        </button>
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
        <button onClick={props.updateConsumptionLogEntry}>Save</button>
        <button onClick={props.cancelClick}>Cancel</button>
      </div>
    );
  }
}
