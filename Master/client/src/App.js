import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import "bootstrap/dist/css/bootstrap.min.css";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CreateEvent from "./components/event/create-event.component";
import ViewEvent from "./components/event/view-event.component";
import EditEvent from "./components/event/edit-event.component";
import EventsList from "./components/event/events-list.component";
import ViewProfile from "./components/profile/view-profile.component";
import EditProfile from "./components/profile/edit-profile.component";
import EditAccount from "./components/profile/edit-account.component";
import PrivateRoute from "./components/private-route/PrivateRoute";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container">
            <Navbar />
            <br />
            <Route path="/" exact component={EventsList} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/create" component={CreateEvent} />
              <PrivateRoute exact path="/viewEvent/:id" component={ViewEvent} />
              <PrivateRoute exact path="/edit/:id" component={EditEvent} />
              <PrivateRoute exact path="/viewProfile/:id" component={ViewProfile} />
              <PrivateRoute exact path="/editProfile/:id" component={EditProfile} />
              <PrivateRoute exact path="/editAccount/:id" component={EditAccount} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;