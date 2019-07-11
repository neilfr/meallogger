import React, { Component } from "react";
import { DropDown } from "../components/DropDown";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";

class HealthCanadaList extends Component {
  state = {
    userId: 1,
    foodGroups: [],
    foodNames: [],
    foodGroupId: 0
  };

  componentDidMount() {
    this.loadFoodGroups();
  }

  loadFoodGroups = () => {
    API.getFoodGroups()
      .then(res => {
        this.setState({ foodGroups: res.data });
        console.log("res.data:", res.data);
      })
      .catch(err => console.log(err));
  };

  loadFoodNames = foodGroupId => {
    // API.getFoodNames()
    API.getFoodNamesByFoodGroupId(foodGroupId)
      .then(res => {
        console.log("res.data:", res.data);
        console.log("foodGroupId:", foodGroupId);
        this.setState({ foodNames: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleInputChange = event => {
    console.log("event:", event);
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    value > 0 ? this.loadFoodNames(value) : this.setState({ foodNames: [] });
  };

  addFavouriteFood = favouriteFood => {
    console.log("adding favourite food:", JSON.stringify(favouriteFood));
    API.addFavouriteFood(favouriteFood)
      .then(res => {
        console.log("got something back:", res.data);
      })
      .then(() => {
        const foodGroup = this.state.foodGroupId;
        this.loadFoodNames(foodGroup);
      });
  };

  unFavouriteFood = favouriteFood => {
    console.log("remove favourite food:", JSON.stringify(favouriteFood));
    API.unFavouriteFood(favouriteFood)
      .then(res => {
        console.log("got something back:", res.data);
      })
      .then(() => {
        const foodGroup = this.state.foodGroupId;
        this.loadFoodNames(foodGroup);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <DropDown
            name="foodGroupId"
            onChange={this.handleInputChange}
            label="Food Group"
            value={this.state.foodGroupId}
          >
            {this.state.foodGroups.map(foodGroup => (
              <option key={foodGroup.foodGroupId} value={foodGroup.foodGroupId}>
                {foodGroup.foodGroupName}
              </option>
            ))}
          </DropDown>
        </div>
        <div className="row">
          {this.state.foodNames.length ? (
            <List>
              {this.state.foodNames.map(foodName => (
                <ListItem key={foodName.foodId}>
                  {foodName.favourite === null ? (
                    <i
                      className="far fa-star"
                      onClick={() => {
                        this.addFavouriteFood({
                          userId: this.state.userId,
                          foodId: foodName.foodId
                        });
                      }}
                    />
                  ) : (
                    <i
                      className="fas fa-star"
                      onClick={() => {
                        this.unFavouriteFood({
                          userId: this.state.userId,
                          foodId: foodName.foodId
                        });
                      }}
                    />
                  )}
                  <strong>
                    ID:{foodName.foodId}
                    Code:{foodName.foodCode}
                    Name:{foodName.foodDescription}
                  </strong>
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>Search or select food group</h3>
          )}
        </div>
      </div>
    );
  }
}

export default HealthCanadaList;
