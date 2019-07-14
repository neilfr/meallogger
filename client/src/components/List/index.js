import React from "react";
import "./style.css";

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export function ListItem(props) {
  console.log("props is:", props);
  return <li className="list-group-item">tbd</li>;
}
