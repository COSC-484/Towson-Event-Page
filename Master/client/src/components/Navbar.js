import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import logo from "../images/towson_logo3.png";
import { logoutUser } from "../actions/authActions";
import "../CSS/navbar.css";
import "font-awesome/css/font-awesome.min.css";
import { getUserId } from "../utils/helpers.js";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      firstName: "",
      lastName: "",
    };
  }

  componentDidMount() {
      axios
        .get("http://localhost:4000/api/users/" + this.state.userId)
        .then((response) => {
          this.setState({
            userId: getUserId(),
            firstName: response.data.firstName,
            lastName: response.data.lastName,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  componentDidUpdate() {
      axios
        .get("http://localhost:4000/api/users/" + this.state.userId)
        .then((response) => {
          this.setState({
            userId: getUserId(),
            firstName: response.data.firstName,
            lastName: response.data.lastName,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  viewProfileLink(userId) {
    if (userId.length > 0) {
      return "/viewProfile/";
    } else {
      return "/login";
    }
  }

  editProfileLink(userId) {
    if (userId.length > 0) {
      return "/editProfile/";
    } else {
      return "/login";
    }
  }

  getAccountName(userId) {
    if (userId.length > 0) {
      return this.state.firstName + " " + this.state.lastName;
    } else {
      return "Account";
    }
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  showLoginOrLogout(userId) {
    if (userId.length > 0) {
      return <a onClick={this.onLogoutClick}>Logout</a>;
    } else {
      return <a href="/login">Login</a>;
    }
  }

  showRegister(userId) {
    if (userId.length > 0) {
      return;
    } else {
      return <a href="/register">Register</a>;
    }
  }

  showEditAccount(userId) {
    if (userId.length > 0) {
      return <a href={"/editAccount/" + this.state.userId}> Edit Account </a>;
    } else {
      return;
    }
  }

  render() {
    return (
      <div className="topMenu">
        <a
          href="https://www.towson.edu/"
          className="leftOptionsLogo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} height="40" alt="Towson Logo" />
        </a>
        <a href="/" className="leftOptions">
          <i className="fa fa-fw fa-home"></i>Home
        </a>
        <a href="/create" className="leftOptions">
          <i className="fa fa-calendar"></i>Create Event
        </a>
        <div className="dropdownMain">
          <div className="leftOptions2">
            <i className="fa fa-plus-circle"></i>Profile
          </div>
          <div className="dropdownContent">
            <a
              href={this.viewProfileLink(this.state.userId) + this.state.userId}
            >
              View Profile
            </a>
            <a
              href={this.editProfileLink(this.state.userId) + this.state.userId}
            >
              Edit Profile
            </a>
          </div>
        </div>
        <div className="dropdownMain2">
          <div className="leftOptions2">
            <i className="fa fa-fw fa-user"></i>
            {this.getAccountName(this.state.userId)}
          </div>
          <div className="dropdownContent">
            {this.showLoginOrLogout(this.state.userId)}
            {this.showRegister(this.state.userId)}
            {this.showEditAccount(this.state.userId)}
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
