import React, { Component } from "react";
import { DropDown } from "../components/DropDown";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { LogItem } from "../components/LogItem";

class ConsumptionLog extends Component {
  state = {
    userId: 1,
    consumptionLog: [],
    currentLogEntry: {}
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

  setCurrentLogEntry = consumptionLogId => {
    console.log("updating log entry", consumptionLogId);
    const test = this.state.consumptionLog.filter(logEntry => {
      if (logEntry.consumptionLogId === consumptionLogId) return logEntry;
    });
    console.log("test is:", test);
    this.setState({ currentLogEntry: test[0] });
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
      <div className="container">
        {/* to orient log details beside log entries list*/}
        <div className="row">
          {/* log list column */}
          <div className="col">
            <div className="row">
              <button
                onClick={() => {
                  this.addConsumptionLogEntry();
                }}
              >
                New Log Entry
              </button>
            </div>
            {/* // row */}

            <div className="row">
              {this.state.consumptionLog.length ? (
                <List>
                  {this.state.consumptionLog.map(logEntry => (
                    <>
                      <ListItem key={logEntry.consumptionLogId}>
                        <div
                          className="log-entry"
                          onClick={() => {
                            this.setCurrentLogEntry(logEntry.consumptionLogId);
                          }}
                        >
                          LogID:{logEntry.consumptionLogId}
                          FoodID:{logEntry.foodId}
                          FoodDescription:{logEntry.foodDescription}
                          Quantity:{logEntry.quantity}
                          Date:{logEntry.logDate}
                          {/* <LogItem key={logEntry.consumptionLogId} /> */}
                        </div>
                        <button
                          onClick={() => {
                            this.deleteConsumptionLogEntry(
                              logEntry.consumptionLogId
                            );
                          }}
                        >
                          X
                        </button>
                      </ListItem>
                    </>
                  ))}
                </List>
              ) : (
                <h3>Add a new log entry</h3>
              )}
            </div>
            {/* end row */}
          </div>
          {/* end log list col */}

          {/* log details column */}
          <div className="col">
            {this.state.currentLogEntry ? (
              <div>
                LogID:{this.state.currentLogEntry.consumptionLogId}
                FoodID:{this.state.currentLogEntry.foodId}
                FoodDescription:{this.state.currentLogEntry.foodDescription}
                Quantity:{this.state.currentLogEntry.quantity}
                Date:{this.state.currentLogEntry.logDate}
              </div>
            ) : (
              <h3>select a log entry to edit</h3>
            )}
            {/* end row */}
          </div>
          {/* end of orienting log details beside log entry list */}
        </div>
      </div> // end container
    );
  }
}

export default ConsumptionLog;
