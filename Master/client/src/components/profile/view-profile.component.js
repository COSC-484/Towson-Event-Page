import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../images/towson_logo.png";
import {
  formatDateMMddYYYY,
  adjustTimeZone,
  formatStartEndTime,
  timeToInt,
  isYourEvent,
  getUserId,
} from "../../utils/helpers.js";

const Event = (props) => (
  <tr>
    <td>{props.event.event_name}</td>
    <td>{formatDateMMddYYYY(adjustTimeZone(props.event.event_date))}</td>
    <td>
      {formatStartEndTime(
        props.event.event_timeStart,
        props.event.event_timeEnd
      )}
    </td>
    <td>{props.event.event_location}</td>
    <td>{props.event.event_numAttending}</td>
    <td>
      <Link to={"/viewEvent/" + props.event._id}>View</Link>
    </td>
    <td>{displayEditLink(props.event.event_userId, props.event._id)}</td>
  </tr>
);

function displayEditLink(eventUserId, eventId) {
  if (isYourEvent(eventUserId, getUserId()) === true) {
    return <Link to={"/edit/" + eventId}>Edit</Link>;
  }
}

function searchingForCreated(term) {
  return function (x) {
    var userIdMatches = x.event_userId === term;

    // true if term is empty, name has a match, or description has a match
    return userIdMatches;
  };
}

function searchingForAttending(term) {
  return function (x) {
    var userIdMatches = x.event_attending.includes(term);

    // true if term is empty, name has a match, or description has a match
    return userIdMatches;
  };
}

export default class viewProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      date: "",
      bio: "",
      profilPic: "",
      events: [],
    };
  }

  componentDidMount() {
    document.body.style.backgroundImage = ""; //reset background

    axios
      .get("http://localhost:4000/api/users/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          userId: response.data._id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          date: response.data.date,
          bio: response.data.bio,
          profilPic: "",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/api/events/")
      .then((response) => {
        this.setState({
          events: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidUpdate() {
    axios
      .get("http://localhost:4000/api/users/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          userId: response.data._id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          date: response.data.date,
          bio: response.data.bio,
          profilPic: "",
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:4000/api/events/")
      .then((response) => {
        this.setState({
          events: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  sortDateEarliest(allEvents) {
    allEvents.sort((a, b) => {
      var dateA = new Date(a.event_date);
      var dateB = new Date(b.event_date);

      if (dateA.getDate() !== dateB.getDate()) {
        //console.log(dateA.getDate() + ' - ' + dateB.getDate());
        return dateA - dateB;
      } else {
        //console.log('Same!   ' + timeToInt(a.event_timeStart) + ' - ' + timeToInt(b.event_timeStart));
        return timeToInt(a.event_timeStart) - timeToInt(b.event_timeStart);
      }
    });
  }

  createdEventsList() {
    var allEvents = [...this.state.events];
    this.sortDateEarliest(allEvents);

    return allEvents
      .filter(searchingForCreated(this.state.userId))
      .map(function (currentEvent, i) {
        return <Event event={currentEvent} key={i} />;
      });
  }

  attendingEventsList() {
    var allEvents = [...this.state.events];
    this.sortDateEarliest(allEvents);

    return allEvents
      .filter(searchingForAttending(this.state.userId))
      .map(function (currentEvent, i) {
        return <Event event={currentEvent} key={i} />;
      });
  }

  //User's Profile will become username's profile
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="form-group">
            <label className="boldLabel">Your </label>
            <label className="boldLabel"> Profile </label>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-9 border border-dark">
            <div className="form-group">
              <label className="titleLabel">Events Created</label>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Size</th>
                    <th>Action</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{this.createdEventsList()}</tbody>
              </table>
            </div>
            <div className="form-group" id="moveDown">
              <label className="titleLabel">Events Attending</label>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Size</th>
                    <th>Action</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{this.attendingEventsList()}</tbody>
              </table>
            </div>
          </div>
          <div className="col-6 col-md-3 border border-dark">
            <div className="pic" style={{ paddingTop: "10px" }}>
              <img src={logo} style={{ width: "100%" }} alt="Towson Logo"/>
            </div>
            <hr className="darkLine" />
            <div className="form-group">
              <label className="boldLabel">Name: </label>
              <label>{this.state.firstName + " " + this.state.lastName}</label>
            </div>
            <div className="form-group">
              <label className="boldLabel">Email: </label>
              <label>{this.state.email}</label>
            </div>
            <div className="form-group">
              <label className="boldLabel">Bio: </label>
              <label>{this.state.bio}</label>
            </div>
            <div className="form-group">
              <label className="boldLabel">Joined: </label>
              <label>{formatDateMMddYYYY(this.state.date)}</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
