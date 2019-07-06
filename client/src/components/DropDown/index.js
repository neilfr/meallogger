import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function DropDown(props) {
  console.log("Props are:", props);
  return (
    <div className="form-group">
      <label>
        {props.label}
        <select {...props} className="form-control">
          {props.children}
        </select>
      </label>
    </div>
  );
}
