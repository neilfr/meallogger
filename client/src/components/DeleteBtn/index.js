import React from "react";
import "./style.css";

// ...props, spread all of the passed props onto this element

export function DeleteBtn(props) {
  console.log("Delete Button Props are:", props);
  return <span {...props}>X</span>;
}
