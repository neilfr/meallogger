import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import { DropDown } from "../components/DropDown";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

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

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

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
    this.loadFoodNames(value);
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

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.author) {
  //     API.saveBook({
  //       title: this.state.title,
  //       author: this.state.author,
  //       synopsis: this.state.synopsis
  //     })
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };

  render() {
    return (
      <Container fluid>
        <Row>
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
        </Row>
        <Row>
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
                  s
                  <strong>
                    ID:{foodName.foodId}
                    Code:{foodName.foodCode}
                    Name:{foodName.foodDescription}
                  </strong>
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No FoodNames to Display</h3>
          )}
        </Row>
      </Container>
    );
  }
}

export default HealthCanadaList;
