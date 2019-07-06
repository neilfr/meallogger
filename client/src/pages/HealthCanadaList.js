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
    // this.setState({
    //   foodGroups: [
    //     {
    //       id: 1,
    //       code: 1,
    //       name: "veggies"
    //     },
    //     {
    //       id: 2,
    //       code: 2,
    //       name: "meats"
    //     }
    //   ]
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
