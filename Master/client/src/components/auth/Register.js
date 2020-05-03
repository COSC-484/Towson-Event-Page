import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import "../../CSS/registerLogin.css";
import background from "../../images/school2.jpg";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      bio: '',
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    document.body.style.backgroundImage = "url(" + background + ")";
    document.body.style.height = "100vh";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      bio: this.state.bio,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register_page">
        <div className="form">
            <form className="create_account" noValidate onSubmit={this.onSubmit}>
              <label id="registerLabel">Register</label>
              <br/>
              <span className="redErrorText">{errors.firstName}</span>
              <input onChange={this.onChange}
                value={this.state.firstName}
                placeholder="First Name"
                error={errors.firstName}
                id="firstName"
                type="text"
                className={classnames("", {
                  invalid: errors.firstName
                })}
              />
              <span className="redErrorText">{errors.lastName}</span>
              <input
                onChange={this.onChange}
                value={this.state.lastName}
                placeholder="Last Name"
                error={errors.lastName}
                id="lastName"
                type="text"
                className={classnames("", {
                  invalid: errors.lastName
                })}
              />
              <span className="redErrorText">{errors.email}</span>
              <input
                  onChange={this.onChange}
                  value={this.state.email}
                  placeholder="Email"
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <span className="redErrorText">{errors.password}</span>
                 <input
                  onChange={this.onChange}
                  value={this.state.password}
                  placeholder="Password"
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <span className="redErrorText">{errors.password2}</span>
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  placeholder="Confirm Password"
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
              <button type="submit">Create Account</button>
              <p className="message"><strong>Already a Member?</strong><Link to="/login">Login</Link></p>
            </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
