import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/login" component={Login} />
          <Redirect from="/" to="/login"/>
        <Switch>
          <PrivateRoute exact path="/bubble-page" component={BubblePage} />
          <Route path="/login" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
