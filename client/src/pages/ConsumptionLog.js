import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";
import {
  FavouriteFoodSelectionList,
  FavouriteFoodSelectionListItem
} from "../components/FavouriteFoodSelectionList";
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
    favouriteFoods: []
  };

  componentDidMount() {
    this.loadConsumptionLog();
    this.loadFavouriteFoods();
  }

  loadConsumptionLog = () => {
    API.getConsumptionLogByUserId(this.state.userId)
      .then(res => {
        console.log("response from getConsumptionLogByUserId:", res.data);
        this.setState({
          currentLogEntry: null,
          consumptionLog: res.data
        });
      })
      .catch(err => console.log(err));
  };

  loadFavouriteFoods = () => {
    console.log("load favourite foods for user:", this.state.userId);
    API.getFavouriteFoodsByUserId(this.state.userId)
      .then(res => {
        console.log("response from getFavouriteFoodsByUserId:", res.data);
        this.setState({ favouriteFoods: res.data });
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    const logEntry = this.state.currentLogEntry;
    logEntry[name] = value;
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
    this.setState({ currentLogEntry: logEntry });
  };

  updateConsumptionLogEntry = () => {
    API.updateConsumptionLogEntry(this.state.currentLogEntry)
      .then(res => {
        console.log("response from updateConsumptionLogEntry:", res.data);
      })
      .then(() => {
        this.loadConsumptionLog();
      });
  };

  updateConsumptionLogEntryFood = foodId => {
    const logEntry = this.state.currentLogEntry;
    logEntry.foodId = foodId;
    this.setState({ currentLogEntry: logEntry });
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
        console.log("response from addConsumptionLogEntry:", res.data);
      })
      .then(() => {
        this.loadConsumptionLog();
      });
  };

  deleteConsumptionLogEntry = consumptionLogId => {
    API.deleteConsumptionLogEntry(consumptionLogId)
      .then(res => {
        console.log("response from deleteConsumptionLogEntry:", res.data);
      })
      .then(() => {
        this.loadConsumptionLog();
      });
  };

  setCurrentLogEntry = consumptionLogId => {
    const newLogEntry = this.state.consumptionLog.filter(logEntry => {
      if (logEntry.consumptionLogId === consumptionLogId) {
        return logEntry;
      }
    });
    this.setState({
      currentLogEntry: newLogEntry[0]
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <LogList
              consumptionLog={this.state.consumptionLog}
              setCurrentLogEntry={this.setCurrentLogEntry}
              deleteConsumptionLogEntry={this.deleteConsumptionLogEntry}
              addConsumptionLogEntry={this.addConsumptionLogEntry}
            />
          </div>

          <div className="col">
            <LogEntryForm
              logEntry={this.state.currentLogEntry}
              onChange={this.handleInputChange}
              saveClick={this.updateConsumptionLogEntry}
              cancelClick={this.loadConsumptionLog}
            />
          </div>

          <div className="col">
            <FavouriteFoodSelectionList
              favouriteFoods={this.state.favouriteFoods}
              handleFavouriteFoodChange={this.handleFavouriteFoodChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ConsumptionLog;
