import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class FoodNames extends Component {
  state = {
    foodNames: []
  };

  componentDidMount() {
    this.loadFoodNames();
  }

  loadFoodNames = () => {
    API.getFoodNames()
      .then(res => {
        this.setState({ foodNames: res.data });
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

  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

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
          {this.state.foodNames.length ? (
            <List>
              {this.state.foodNames.map(foodName => (
                <ListItem key={foodName.foodId}>
                  <strong>
                    ID:{foodName.foodId}
                    Code:{foodName.foodCode}
                    Desc:{foodName.foodDescription}
                    Group:{foodName.foodGroupId}
                    Source:{foodName.foodSourceId}
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

export default FoodNames;
