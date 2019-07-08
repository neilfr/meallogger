import React, { Component } from "react";
import { DropDown } from "../components/DropDown";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

class ConsumptionLog extends Component {
  state = {
    userId: 1,
    consumptionLog: []
  };

  componentDidMount() {
    console.log("component did mount");
    this.loadConsumptionLog();
  }

  loadConsumptionLog = () => {
    API.getConsumptionLogByUserId(this.state.userId)
      .then(res => {
        this.setState({ consumptionLog: res.data });
        console.log("res.data:", res.data);
      })
      .catch(err => console.log(err));
  };

  // handleInputChange = event => {
  //   console.log("event:", event);
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  //   value > 0 ? this.loadFoodNames(value) : this.setState({ foodNames: [] });
  // };

  addConsumptionLogEntry = () => {
    const consumptionLogEntry = {
      consumptionLogId: null,
      userId: this.state.userId,
      foodId: 0,
      quantity: 100,
      logDate: null //TODO: populate datetime
    };
    console.log("adding log entry:", JSON.stringify(consumptionLogEntry));
    API.addConsumptionLogEntry(consumptionLogEntry)
      .then(res => {
        console.log("got something back:", res.data);
      })
      .then(() => {
        this.loadConsumptionLog();
      });
  };

  deleteConsumptionLogEntry = consumptionLogId => {
    console.log("deleting entry");
    API.deleteConsumptionLogEntry(consumptionLogId)
      .then(res => {
        console.log("got something back:", res.data);
      })
      .then(() => {
        this.loadConsumptionLog();
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
        <button
          onClick={() => {
            this.addConsumptionLogEntry();
          }}
        >
          New Log Entry
        </button>
        <Row>
          {this.state.consumptionLog.length ? (
            <List>
              {this.state.consumptionLog.map(logEntry => (
                <ListItem key={logEntry.consumptionLogId}>
                  <strong>
                    LogID:{logEntry.consumptionLogId}
                    FoodID:{logEntry.foodId}
                    FoodDescription:{logEntry.foodDescription}
                    Quantity:{logEntry.quantity}
                    Date:{logEntry.logDate}
                  </strong>
                  <button
                    onClick={() => {
                      this.deleteConsumptionLogEntry(logEntry.consumptionLogId);
                    }}
                  >
                    X
                  </button>
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Log Entries</h3>
          )}
        </Row>
      </Container>
    );
  }
}

export default ConsumptionLog;
