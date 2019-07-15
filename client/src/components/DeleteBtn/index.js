import React from "react";
import "./style.css";

// ...props, spread all of the passed props onto this element

export function DeleteBtn(props) {
  return <span {...props}>X</span>;
}
