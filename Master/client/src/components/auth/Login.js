import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import background from "../../images/school2.jpg";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    document.body.style.backgroundImage = "url(" + background + ")";
    document.body.style.height = "100vh";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

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

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register_page">
        <div className="form">
            <h2>LOGIN</h2>
            <form className="login_page" onSubmit={this.onSubmit}>
              <span className="redErrorText">
                {errors.email}
                {errors.emailnotfound}
              </span>
              <input
                onChange={this.onChange}
                value={this.state.email}
                placeholder="Email"
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email || errors.emailnotfound,
                })}
              />
              <span className="redErrorText">
                {errors.password}
                {errors.passwordincorrect}
              </span>
              <input
                onChange={this.onChange}
                value={this.state.password}
                placeholder="Password"
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password || errors.passwordincorrect,
                })}
              />
              <button type="submit">Login</button>
              <p className="message">
                <strong>Not a Member </strong>
                <a href="/register">Register</a>
              </p>
            </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
