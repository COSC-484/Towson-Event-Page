import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateEvent from "./components/create-event.component";
import ViewEvent from "./components/view-event.component";
import EditEvent from "./components/edit-event.component";
import EventsList from "./components/events-list.component";

import logo from "./towson_logo.png";
import viewProfile from "./components/view-profile.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://www.towson.edu/" target="_blank">
              <img src={logo} width="40" height="40" alt="Towson Logo" />
            </a>
            <Link to="/" className="navbar-brand">Towson Events</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Events</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Event</Link>
                </li>
                <li className="navbar-item">
                  <Link to="" className="nav-link">Sign Up</Link>
                </li>
                <li className="navbar-item">
                  <Link to="" className="nav-link">Login</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/viewP" className="nav-link">View Profile</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={EventsList} />
          <Route path="/view/:id" component={ViewEvent} />
          <Route path="/edit/:id" component={EditEvent} />
          <Route path="/create" component={CreateEvent} />
          <Route path="/viewP" component={viewProfile} />
        </div>
      </Router>
    );
  }
}

export default App;
