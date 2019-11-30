import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut} from "../../store/actions/index";

class Navbar extends Component {
  render() {
    const authLinks = (
      <ul>
        <li>
          <Link to="/profiles">Developers</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/newPost"><i className="far fa-envelope"></i>{"  "}
          <span className="hide-sm">New Post</span>
          
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <i className="fas fa-user" />{" "}
            <span className="hide-sm">Dashboard</span>
          </Link>
        </li>
        <li onClick={this.props.onLogOut}>
          <Link to="/posts" >
            <i className="fas fa-sign-out-alt" />{" "}
            <span className="hide-sm">Logout</span>
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul>
        <li>
          <Link to="/profiles">Developers</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code" /> Post-Pro
          </Link>
        </h1>

        <Fragment>
          {this.props.isAuthenticated ? authLinks : guestLinks}
        </Fragment>
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
export default connect( mapStateToProps, mapsDispatchToProps)(Navbar);
