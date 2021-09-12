import "./App.css";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserRides from "./UserRides";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/user/:userId">
          <UserRides />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
