import React from "react";
import "./style.css";

// ...props, spread all of the passed props onto this element

const element = document.getElementById("testid");
console.log("element is:", element);
const tryThis = () => {
  console.log("trying this...");
};

export function Button(props) {
  console.log("Props are:", props);
  return (
    <button id="testid" onClick={tryThis} className="myButton" {...props}>
      {props.children}
    </button>
  );
}
