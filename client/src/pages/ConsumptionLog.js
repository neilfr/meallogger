import React, { Component } from "react";
import API from "../utils/API";
import { FavouriteFoodSelectionList } from "../components/FavouriteFoodSelectionList";
import { LogList } from "../components/LogList";
import { LogEntryForm } from "../components/LogEntryForm";
import Moment from "moment";

class ConsumptionLog extends Component {
  state = {
    userId: 1,
    consumptionLog: [],
    currentLogEntry: null,
    favouriteFoods: [],
    display: "logList"
  };

  componentDidMount() {
    this.loadConsumptionLog();
    this.loadFavouriteFoods();
  }

  loadConsumptionLog = () => {
    API.getConsumptionLogByUserId(this.state.userId)
      .then(res => {
        this.setState({
          currentLogEntry: null,
          consumptionLog: res.data,
          display: "logList"
        });
      })
      .catch(err => console.log(err));
  };

  loadFavouriteFoods = () => {
    API.getFavouriteFoodsByUserId(this.state.userId)
      .then(res => {
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
    logEntry.calories = selectedFavourite[0].calories;
    this.setState({ currentLogEntry: logEntry, display: "logEntryForm" });
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

  updateConsumptionLogEntryFood = () => {
    this.setState({ display: "favouritesList" });
  };

  addConsumptionLogEntry = () => {
    const now = Moment().format("YYYY-MM-DD HH:mm");
    const consumptionLogEntry = {
      consumptionLogId: null,
      userId: this.state.userId,
      foodId: 0,
      quantity: 100,
      logDate: now
    };
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
      currentLogEntry: newLogEntry[0],
      display: "logEntryForm"
    });
  };

  render() {
    switch (this.state.display) {
      case "logList":
        return (
          <div className="container">
            <LogList
              consumptionLog={this.state.consumptionLog}
              setCurrentLogEntry={this.setCurrentLogEntry}
              deleteConsumptionLogEntry={this.deleteConsumptionLogEntry}
              addConsumptionLogEntry={this.addConsumptionLogEntry}
            />
          </div>
        );
      case "logEntryForm":
        return (
          <div className="container">
            <LogEntryForm
              logEntry={this.state.currentLogEntry}
              onChange={this.handleInputChange}
              updateConsumptionLogEntry={this.updateConsumptionLogEntry}
              cancelClick={this.loadConsumptionLog}
              updateConsumptionLogEntryFood={this.updateConsumptionLogEntryFood}
            />
          </div>
        );
      case "favouritesList":
        return (
          <div className="col">
            <FavouriteFoodSelectionList
              favouriteFoods={this.state.favouriteFoods}
              handleFavouriteFoodChange={this.handleFavouriteFoodChange}
            />
          </div>
        );
    }
  }
}

export default ConsumptionLog;
