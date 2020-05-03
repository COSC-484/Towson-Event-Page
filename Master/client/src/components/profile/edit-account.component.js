import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, updateAccount } from "../../actions/authActions";
import classnames from "classnames";
import { getUserId } from "../../utils/helpers";

function searchingForCreated(term) {
  return function (x) {
    var userIdMatches = x.event_userId === term;

    // true if term is empty, name has a match, or description has a match
    return userIdMatches;
  };
}

class EditAccount extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeCurrentPasswordCheck = this.onChangeCurrentPasswordCheck.bind(
      this
    );
    this.onChangeNewPassword1 = this.onChangeNewPassword1.bind(this);
    this.onChangeNewPassword2 = this.onChangeNewPassword2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      currentPassword: "",
      currentPasswordCheck: "",
      newPassword1: "",
      newPassword2: "",
      errors: {},
      events: [],
    };
  }

  componentDidMount() {
    document.body.style.backgroundImage = ""; //reset background

    axios
      .get("http://localhost:4000/api/users/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          email: response.data.email,
          currentPassword: response.data.password,
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeCurrentPasswordCheck(e) {
    this.setState({
      currentPasswordCheck: e.target.value,
    });
  }

  onChangeNewPassword1(e) {
    this.setState({
      newPassword1: e.target.value,
    });
  }

  onChangeNewPassword2(e) {
    this.setState({
      newPassword2: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      currentPassword: this.state.currentPasswordCheck,
      password: this.state.newPassword1,
      password2: this.state.newPassword2,
    };

    this.props.updateAccount(getUserId(), userData, this.props.history);
  }

  deleteCreatedEvents() {
    var allEvents = [...this.state.events];
    var userId = getUserId();
    var eventsTheyCreated = [];

    allEvents
      .filter(searchingForCreated(userId))
      .map(function (currentEvent, i) {
        eventsTheyCreated.push(currentEvent._id);
        return true;
      });

    eventsTheyCreated.forEach((eventId) => {
      axios
        .post("http://localhost:4000/api/events/delete/" + eventId)
        .then((res) => console.log(res.data));
    });
  }

  deleteAccount() {
    this.deleteCreatedEvents();

    axios
      .post(
        "http://localhost:4000/api/users/delete/" + this.props.match.params.id
      )
      .then((res) => console.log(res.data));

    this.props.logoutUser();
    this.props.history.push("/");
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <h3 align="center">Edit Account</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email: </label>
            <label className="redErrorText">{errors.email}</label>
            <input
              type="text"
              value={this.state.email}
              onChange={this.onChangeEmail}
              error={errors.email}
              className={classnames("form-control", {
                invalid: errors.email,
              })}
            />
          </div>
          <div className="form-group">
            <label>Current Password: </label>
            <label className="redErrorText">
              {errors.currentPassword}
              {errors.passwordincorrect}
            </label>
            <label className="redErrorText" id="currentPasswordError"></label>
            <input
              type="text"
              onChange={this.onChangeCurrentPasswordCheck}
              error={errors.currentPassword}
              className={classnames("form-control", {
                invalid: errors.currentPassword || errors.passwordincorrect,
              })}
            />
          </div>
          <div className="form-group">
            <label>New Password: </label>
            <label className="redErrorText">{errors.password}</label>
            <input
              type="text"
              onChange={this.onChangeNewPassword1}
              error={errors.password}
              className={classnames("form-control", {
                invalid: errors.password,
              })}
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password: </label>
            <label className="redErrorText">{errors.password2}</label>
            <input
              type="text"
              onChange={this.onChangeNewPassword2}
              error={errors.password2}
              className={classnames("form-control", {
                invalid: errors.password2,
              })}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Update Account"
              className="btn btn-primary"
            />
          </div>
          <div className="form-group">
            <input
              type="button"
              value="Delete Account"
              onClick={() => {
                if(window.confirm("Are you sure?")){
                    this.deleteAccount()
                }
              }}
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

EditAccount.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  updateAccount: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { logoutUser, updateAccount })(
  EditAccount
);
