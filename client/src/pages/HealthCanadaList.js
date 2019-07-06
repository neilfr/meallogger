import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class HealthCanadaList extends Component {
  state = {
    foodGroups: []
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
          <Jumbotron>
            <h1>FoodGroups list</h1>
          </Jumbotron>
        </Row>
        <Row>
          {this.state.foodGroups.length ? (
            <List>
              {this.state.foodGroups.map(foodGroup => (
                <ListItem key={foodGroup.foodGroupId}>
                  <strong>
                    ID:{foodGroup.foodGroupId}
                    Code:{foodGroup.foodGroupCode}
                    Name:{foodGroup.foodGroupName}
                  </strong>
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No FoodGroups to Display</h3>
          )}
        </Row>
      </Container>
    );
  }
}

export default HealthCanadaList;
