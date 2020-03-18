import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../store/actions/index";
import NavBar from "react-bootstrap/Navbar";

class Navbar extends Component {
  render() {
    const authLinks = (
      <Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/profiles">
            Developers
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/posts">
            Posts
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/newPost">
            <i className="far fa-envelope"></i>
            {"  "}
            <span className="hide-sm">New Post</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-user" />{" "}
            <span className="hide-sm">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item" onClick={this.props.onLogOut}>
          <Link className="nav-link" to="/posts">
            <i className="fas fa-sign-out-alt" />{" "}
            <span className="hide-sm">Logout</span>
          </Link>
        </li>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/profiles">
            Developers
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/posts">
            Posts
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </Fragment>
    );

    return (
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
        <ul className="navbar-nav">
           <li className="nav-item">
            <Link className="navbar-brand" to="/">
               <i className="fas fa-code" /> Post-Pro
            </Link>
          </li> 
          {this.props.isAuthenticated ? authLinks : guestLinks} 
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated
  };
};

const mapsDispatchToProps = dispatch => {
  return {
    onLogOut: () => dispatch(logOut())
  };
};
export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(Navbar);
