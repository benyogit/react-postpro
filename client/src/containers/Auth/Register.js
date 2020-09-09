import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index.js";
import { connect } from "react-redux";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      error: ""
    };
  }

  onChange = e => {
    e.preventDefault();

    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    let checkValidity = true;
    let message="";
    if (this.state.password !== this.state.passwordConfirm) {
      checkValidity = false;
      message = "Password must match The confirm Password field";
      
    }
    if (this.state.password.length < 6 || this.state.password.length > 10) {
      checkValidity = false;
      message = "Password must be 6 to 10 characters";
      
    }
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!pattern.test(this.state.email)) {
      checkValidity = false;
      message = "Must Enter a Valid email Address"
    }
    if (this.state.name.length < 4) {
      checkValidity = false;
      message = "Name must contain at least 4 characters"
      
    }
    if (checkValidity) {
      console.log("valid : go to actions");
      const { email, password, passwordConfirm, name } = { ...this.state };
      this.props.onSignUp(email, password, passwordConfirm, name);
    }else{
      this.props.onAuthFailed(message);
    }
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/posts" />;
    }
    return (
      <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user" /> Create Your Account
        </p>
        <form className="form" onSubmit={e => this.onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={e => this.onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              className="form-control"
              value={this.state.email}
              onChange={e => this.onChange(e)}
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="form-control"
              value={this.state.password}
              onChange={e => this.onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="passwordConfirm"
              className="form-control"
              value={this.state.password2}
              onChange={e => this.onChange(e)}
            />
          </div>
          <p> {this.props.errorMessage !==""? this.props.errorMessage:null} </p>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already SignUp? <Link to="/login">Sign In</Link>
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
    onSignUp: (email, password, passwordConfirm, name) =>
      dispatch(actions.signUp(email, password, passwordConfirm, name)),
    onAuthFailed: message => dispatch(actions.authFailed(message))
  };
};

export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(Register);
