import React from "react";
import "./style.css";

export function HealthCanadaFoodList(props) {
  console.log("HealthCanadaFoodList props is:", props);
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{props.children}</ul>
    </div>
  );
}

export function HealthCanadaFoodListItem(props) {
  console.log("props is:", props);
  return <li className="list-group-item">{props.children}</li>;
}
