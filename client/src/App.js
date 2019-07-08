import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HealthCanadaList from "./pages/HealthCanadaList";
import FoodNames from "./pages/FoodNames";
import ConsumptionLog from "./pages/ConsumptionLog";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={HealthCanadaList} />
          <Route exact path="/foodgroups" component={HealthCanadaList} />
          <Route exact path="/foodnames" component={FoodNames} />
          <Route exact path="/consumptionlog" component={ConsumptionLog} />

          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
