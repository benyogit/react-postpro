import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index.js";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  onChange = e => {
    e.preventDefault();

    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    let checkValidity = true;
    if (this.state.password.length === 0 || this.state.email.length === 0) {
      checkValidity = false;
      this.props.onAuthFailed("Input Should Not be Empty");
    }
    if (checkValidity) {
      const { email, password } = { ...this.state };
      this.props.onSignIn(email, password);
    }
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/posts" />;
    }

    return (
      <Fragment>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user" /> Sign Into Your Account
        </p>
        <form className="form" onSubmit={e => this.onSubmit(e)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={this.state.email}
              className="form-control"
              onChange={e => this.onChange(e)}
              required
            />
            <small id="emailHelp" className="form-text text-muted">Your Email is not shared with anyone.</small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="form-control"
              value={this.state.password}
              onChange={e => this.onChange(e)}
              minLength="6"
            />
          </div>
          <div className="form-group">
            <p>
              {" "}
              {this.props.errorMessage !== ""
                ? this.props.errorMessage
                : null}{" "}
            </p>
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated,
    errorMessage: state.auth.message
  };
};

const mapsDispatchToProps = dispatch => {
  return {
    onSignIn: (email, password, passwordConfirm, name) =>
      dispatch(actions.signIn(email, password)),
    onAuthFailed: message => dispatch(actions.authFailed(message))
  };
};

export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(Login);
