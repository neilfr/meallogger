import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";
import {
  FoodSelectionList,
  FoodSelectionListItem
} from "../components/FoodSelectionList";
import { LogEntry } from "../components/LogEntry";
import Moment from "moment";

class ConsumptionLog extends Component {
  state = {
    userId: 1,
    consumptionLog: [],
    currentLogEntry: null,
    favouriteFoods: []
  };

  componentDidMount() {
    console.log("component did mount");
    this.loadConsumptionLog();
    this.loadFavouriteFoods();
  }

  loadConsumptionLog = () => {
    API.getConsumptionLogByUserId(this.state.userId)
      .then(res => {
        console.log("getConsumptionLogByUserId response:", res.data);
        this.setState({ currentLogEntry: null, consumptionLog: res.data });
      })
      .catch(err => console.log(err));
  };

  loadFavouriteFoods = () => {
    console.log("load favourite foods for user:", this.state.userId);
    API.getFavouriteFoodsByUserId(this.state.userId)
      .then(res => {
        console.log("getFavouriteFoodsByUserId response:", res.data);
        this.setState({ favouriteFoods: res.data });
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    console.log("event:", event);
    const { name, value } = event.target;
    console.log("name", name);
    console.log("value", value);
    console.log(
      "current log entry:",
      JSON.stringify(this.state.currentLogEntry)
    );
    const logEntry = this.state.currentLogEntry;
    logEntry[name] = value;
    console.log("new log entry:", JSON.stringify(logEntry));
    this.setState({ currentLogEntry: logEntry });
  };

  updateConsumptionLogEntry = () => {
    API.updateConsumptionLogEntry(this.state.currentLogEntry)
      .then(res => {
        console.log("got something back:", res.data);
      })
      .then(() => {
        this.loadConsumptionLog();
      });
  };

  addConsumptionLogEntry = () => {
    const now = new Date();
    const consumptionLogEntry = {
      consumptionLogId: null,
      userId: this.state.userId,
      foodId: 0,
      quantity: 100,
      logDate: now
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
  //   console.log("hit form submit");
  //   // if (this.state.title && this.state.author) {
  //   //   API.saveLogEntry({
  //   //     title: this.state.title,
  //   //     author: this.state.author,
  //   //     synopsis: this.state.synopsis
  //   //   })
  //   //     .then(res => this.loadConsumptionLog())
  //   //     .catch(err => console.log(err));
  //   // }
  // };

  render() {
    return (
      <div className="container">
        {/* to orient log details beside log entries list*/}
        <div className="row">
          {/* log list column */}
          <div className="col-4">
            <div className="row">
              <button
                onClick={() => {
                  this.addConsumptionLogEntry();
                }}
              >
                New Log Entry
              </button>
            </div>
            {/* end row */}

            <div className="row">
              {this.state.consumptionLog.length ? (
                <List>
                  {this.state.consumptionLog.map(logEntry => (
                    <>
                      <ListItem key={logEntry.consumptionLogId}>
                        <div className="row">
                          <div
                            className="col-10"
                            onClick={() => {
                              this.setCurrentLogEntry(
                                logEntry.consumptionLogId
                              );
                            }}
                          >
                            {/* LogID:{logEntry.consumptionLogId} */}
                            {/* FoodID:{logEntry.foodId} */}
                            {Moment(logEntry.logDate).format(
                              "YYYY-MM-DD hh:mm a"
                            )}
                            <br />
                            {logEntry.foodDescription}
                            <br />
                            Qty (mg): {logEntry.quantity} Calories:{" "}
                            {(logEntry.calories * logEntry.quantity) / 100}
                          </div>
                          <div className="col">
                            <span
                              onClick={() => {
                                this.deleteConsumptionLogEntry(
                                  logEntry.consumptionLogId
                                );
                              }}
                            >
                              X
                            </span>
                          </div>
                        </div>

                        {/* <button
                          onClick={() => {
                            this.deleteConsumptionLogEntry(
                              logEntry.consumptionLogId
                            );
                          }}
                        >
                          X
                        </button> */}
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
                {console.log("current log entry:", this.state.currentLogEntry)}
                <LogEntry
                  key={this.state.currentLogEntry.consumptionLogId}
                  logEntry={this.state.currentLogEntry}
                  onChange={this.handleInputChange}
                  saveClick={this.updateConsumptionLogEntry}
                  cancelClick={this.loadConsumptionLog}
                />
              </div>
            ) : (
              <h3>select a log entry to edit</h3>
            )}
            {/* end row */}
          </div>
          {/* end of orienting log details beside log entry list */}

          {/* select food column */}
          <div className="col">
            {this.state.favouriteFoods.length && this.state.currentLogEntry ? (
              <FoodSelectionList>
                {this.state.favouriteFoods.map(food => (
                  <>
                    <FoodSelectionListItem key={food.foodId}>
                      FoodId: {food.foodId}
                      <br />
                      {food.foodDescription}
                    </FoodSelectionListItem>
                  </>
                ))}
              </FoodSelectionList>
            ) : (
              <h3>na</h3>
            )}
          </div>
        </div>
      </div> // end container
    );
  }
}

export default ConsumptionLog;
