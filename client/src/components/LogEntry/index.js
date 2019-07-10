import React from "react";
import { SSL_OP_CIPHER_SERVER_PREFERENCE } from "constants";

// This file exports the Input, TextArea, and FormBtn components

export function LogEntry(props) {
  console.log("in log entry, props are:", props);
  const logEntry = props.logEntry.quantity;
  console.log("props.logEntry.quantity is:", logEntry);
  const foo = JSON.stringify(props);
  return (
    <div>
      <h2>Inside LogEntry</h2>
      <p>foo:{foo}</p>
      <p>quantity:{props.logEntry.quantity}</p>
      <input type="number" defaultValue={props.logEntry.quantity} />
      <p>date:{props.logEntry.logDate}</p>
      <input
        type="datetime-local"
        defaultValue={props.logEntry.logDate.slice(0, 16)}
      />
    </div>
  );
}
