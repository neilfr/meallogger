import React from "react";
import "./style.css";

export function FavouriteFoodSelectionList(props) {
  if (!props.favouriteFoods.length) {
    return <div>Add to the Favourites list</div>;
  } else {
    return (
      <div className="list-overflow-container">
        <ul className="list-group">
          {props.favouriteFoods.map(food => (
            <FavouriteFoodSelectionListItem
              key={food.foodId}
              name="foodId"
              handleFavouriteFoodChange={props.handleFavouriteFoodChange}
              value={food.foodId}
              foodDescription={food.foodDescription}
            />
          ))}
        </ul>
      </div>
    );
  }
}
export function FavouriteFoodSelectionListItem(props) {
  console.log("foodselectionlistitem.props is:", props);
  return (
    <button
      className="list-group-item"
      name={props.name}
      onClick={props.handleFavouriteFoodChange}
      value={props.value}
    >
      {props.foodDescription}
    </button>
  );
}
