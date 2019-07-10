import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function LogItem(props) {
  console.log("Props are:", props);
  return (
    <div className="log-item">
      {/* <strong>
        LogID:{logEntry.consumptionLogId}
        FoodID:{logEntry.foodId}
        FoodDescription:{logEntry.foodDescription}
        Quantity:{logEntry.quantity}
        Date:{logEntry.logDate}
      </strong> */}
    </div>
  );
}
