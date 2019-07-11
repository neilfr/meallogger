import React from "react";
import "./style.css";

// ...props, spread all of the passed props onto this element
export function DropDown(props) {
  console.log("Props are:", props);
  return (
    <div className="form-group">
      <label>
        {props.label}
        <select {...props}>{props.children}</select>
      </label>
    </div>
  );
}
