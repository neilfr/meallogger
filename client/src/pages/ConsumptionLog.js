import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";
import {
  FoodSelectionList,
  FoodSelectionListItem
} from "../components/FoodSelectionList";
import { LogList } from "../components/LogList";
import { LogEntry } from "../components/LogEntry";
import { LogEntryForm } from "../components/LogEntryForm";
import { Button } from "../components/Button";
import { DeleteBtn } from "../components/DeleteBtn";
import Moment from "moment";

class ConsumptionLog extends Component {
  state = {
    userId: 1,
    consumptionLog: [],
    currentLogEntry: null,
    favouriteFoods: [],
    displayColumn: "consumptionLog" //other options: "logEntryForm" and "favouritesList"
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
        this.setState({
          currentLogEntry: null,
          consumptionLog: res.data,
          displayColumn: "consumptionLog"
        });
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

  handleFavouriteFoodChange = event => {
    const selectedFavourite = this.state.favouriteFoods.filter(favourite => {
      if (favourite.foodId === parseInt(event.target.value)) {
        return favourite;
      }
    });
    const logEntry = this.state.currentLogEntry;
    logEntry.foodId = selectedFavourite[0].foodId;
    logEntry.foodDescription = selectedFavourite[0].foodDescription;
    this.setState({ currentLogEntry: logEntry, displayColumn: "logForm" });
  };

  updateConsumptionLogEntry = () => {
    API.updateConsumptionLogEntry(this.state.currentLogEntry)
      .then(res => {
        console.log("returned from update consumption log entry:", res.data);
      })
      .then(() => {
        this.loadConsumptionLog();
      });
  };

  updateConsumptionLogEntryFood = foodId => {
    const logEntry = this.state.currentLogEntry;
    logEntry.foodId = foodId;
    this.setState({ currentLogEntry: logEntry, displayColumn: "logEntryForm" });
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
        console.log("response from add consumption log entry:", res.data);
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
    const newLogEntry = this.state.consumptionLog.filter(logEntry => {
      if (logEntry.consumptionLogId === consumptionLogId) {
        console.log("current log entry:", logEntry);
        return logEntry;
      }
    });
    this.setState({
      currentLogEntry: newLogEntry[0],
      displayColumn: "logEntryForm"
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
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
            <LogList
              consumptionLog={this.state.consumptionLog}
              setCurrentLogEntryClick={this.setCurrentLogEntry}
              setDeleteClick={this.deleteConsumptionLogEntry}
            />
          </div>

          <div className="col">
            {this.state.currentLogEntry &&
            this.state.displayColumn === "logEntryForm" ? (
              <LogEntryForm
                key={this.state.currentLogEntry.consumptionLogId}
                logEntry={this.state.currentLogEntry}
                onChange={this.handleInputChange}
                saveClick={this.updateConsumptionLogEntry}
                cancelClick={this.loadConsumptionLog}
              />
            ) : (
              <h3>select a log entry to edit</h3>
            )}
          </div>

          <div className="col">
            {this.state.favouriteFoods.length && this.state.currentLogEntry ? (
              <FoodSelectionList>
                {this.state.favouriteFoods.map(food => (
                  <FoodSelectionListItem key={food.foodId}>
                    <button
                      name="foodId"
                      onClick={this.handleFavouriteFoodChange}
                      value={food.foodId}
                    >
                      {food.foodDescription}
                    </button>
                  </FoodSelectionListItem>
                ))}
              </FoodSelectionList>
            ) : (
              <h3>na</h3>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ConsumptionLog;
