import React from "react";
import "./style.css";

export function FoodSelectionList({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export function FoodSelectionListItem({ children }) {
  return <li className="list-group-item">{children}</li>;
}
